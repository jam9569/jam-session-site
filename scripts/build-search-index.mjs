// Genera dist/search-index.json leggendo l'HTML già compilato di ogni pagina,
// così qualsiasi testo visibile (nomi, corsi, news, contenuti futuri) diventa
// automaticamente cercabile, senza dover mantenere un elenco a mano.
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = join(process.cwd(), "dist");

const CATEGORY_BY_PREFIX = {
  associazione: "Associazione",
  certificazioni: "Certificazioni",
  contatti: "Contatti",
  corsi: "Corsi",
  eventi: "Eventi",
  "european-partners": "European Partners",
  news: "News",
  progetti: "Progetti",
};

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text) {
  return text.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, code) => {
    if (code[0] === "#") {
      const cp = code[1] === "x" || code[1] === "X"
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return ENTITIES[code] ?? m;
  });
}

function cleanTitle(raw) {
  let t = raw.trim();
  if (t === "Jam Session APS") return "Home";
  let changed = true;
  while (changed) {
    changed = false;
    for (const re of [
      /\s*[•—]\s*Jam Session APS$/i,
      /\s*[•—]\s*Jam Session Association APS$/i,
    ]) {
      if (re.test(t)) {
        t = t.replace(re, "").trim();
        changed = true;
      }
    }
  }
  t = t.replace(/^Jam Session Association APS\s*[•—]\s*/i, "").trim();
  return t || raw;
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, files);
    } else if (name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function urlFromFile(file) {
  let rel = relative(DIST, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  rel = rel.replace(/index\.html$/, "");
  return "/" + rel;
}

function categoryFromUrl(url) {
  const first = url.split("/").filter(Boolean)[0];
  return CATEGORY_BY_PREFIX[first] || "Pagina";
}

const files = walk(DIST).filter((f) => {
  const rel = relative(DIST, f);
  return !rel.includes("-backup") && !rel.startsWith("downloads" + sep);
});

const items = [];

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const url = urlFromFile(file);

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? cleanTitle(decodeEntities(titleMatch[1])) : url;

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : "";

  const text = decodeEntities(
    mainHtml
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

  items.push({
    title,
    url,
    category: categoryFromUrl(url),
    content: text,
  });
}

items.sort((a, b) => a.url.localeCompare(b.url));

writeFileSync(join(DIST, "search-index.json"), JSON.stringify(items));
console.log(`search-index.json: ${items.length} pagine indicizzate`);
