import { getCollection } from 'astro:content';

export async function GET() {
  const corsi = await getCollection('corsi');
  const news = await getCollection('news');

  const paginePrincipali = [
    { title: "Home", url: "/", category: "Pagina", excerpt: "Scuola di canto e musica a Bologna. Corsi di canto, pianoforte, chitarra, DJ e molto altro. Sede d'esame Trinity College London." },
    { title: "Chi Siamo", url: "/associazione/chi-siamo", category: "Associazione", excerpt: "La storia, la missione e i numeri di Jam Session APS: scuola di musica riconosciuta dalla Regione Emilia-Romagna, capofila della rete Musica e Società." },
    { title: "Organigramma", url: "/associazione/organigramma", category: "Associazione", excerpt: "Il Consiglio Direttivo e la Segreteria di Jam Session APS: ruoli, responsabilità e contatti." },
    { title: "Agevolazioni Fiscali & Sostienici", url: "/associazione/agevolazioni-sostienici", category: "Associazione", excerpt: "Come detrarre le spese dei corsi con il Bonus Musica e come sostenere Jam Session APS: 5×1000, donazioni e sponsorizzazioni." },
    { title: "Documenti & App", url: "/associazione/documenti-utili", category: "Associazione", excerpt: "Statuto, regolamento e altri documenti di Jam Session APS, più l'app per allievi, famiglie e docenti." },
    { title: "Certificazioni Trinity College London", url: "/certificazioni", category: "Certificazioni", excerpt: "Jam Session APS è sede d'esame Trinity College London (centro 74879): certificazioni musicali internazionali in Classical & Jazz, Rock & Pop e Music Theory." },
    { title: "Corsi", url: "/corsi", category: "Corsi", excerpt: "Tutti i corsi e i laboratori di Jam Session APS: canto, strumenti, DJ e produzione, musica d'insieme e molto altro." },
    { title: "Progetti", url: "/progetti", category: "Progetti", excerpt: "I progetti di Jam Session APS: Musica e Società, Coro di Periferia, Nausica, la Borsa di Studio Giovanni Sisillo, l'Incubatore Orchestrale e Musa." },
    { title: "Musica e Società", url: "/progetti/musica-e-societa", category: "Progetti", excerpt: "La rete di educazione musicale che Jam Session coordina come capofila in Emilia-Romagna: 36 progetti e circa 900 studenti, alla sesta edizione." },
    { title: "Coro di Periferia", url: "/progetti/coro-di-periferia", category: "Progetti", excerpt: "Un coro senza limiti di età che mescola le tradizioni musicali di chi ne fa parte, per contaminare il territorio con la bellezza della diversità." },
    { title: "Nausica", url: "/progetti/nausica", category: "Progetti", excerpt: "Un percorso di musicoterapia per persone con disabilità, in collaborazione con l'ASP Rodriguez di San Lazzaro di Savena." },
    { title: 'Borsa di Studio "Giovanni Sisillo"', url: "/progetti/borsa-di-studio-giovanni-sisillo", category: "Progetti", excerpt: "Una borsa di studio dedicata a Giovanni, batterista e docente della scuola, per trasmettere i valori musicali e umani che lo hanno sempre guidato." },
    { title: "Incubatore Orchestrale", url: "/progetti/incubatore-orchestrale", category: "Progetti", excerpt: "Un percorso annuale con cui sosteniamo giovani ensemble nella crescita verso la piena autonomia artistica e organizzativa." },
    { title: "Musa", url: "/progetti/musa", category: "Progetti", excerpt: "Un percorso di laboratori e incubatore per l'autonomia professionale di giovani musiciste tra i 18 e i 30 anni." },
    { title: "Progetti passati", url: "/progetti/passati", category: "Progetti", excerpt: "I progetti di Jam Session APS che si sono conclusi nel tempo." },
    { title: "Eventi", url: "/eventi", category: "Eventi", excerpt: "Gli eventi pubblici di Jam Session APS: da Voglio Live 2027 all'archivio di masterclass, workshop e concerti realizzati negli anni." },
    { title: "Voglio Live 2027", url: "/eventi/voglio-live-2027", category: "Eventi", excerpt: "La restituzione pubblica dei laboratori di Musica e Società, sabato 29 maggio in Piazza Lucio Dalla a Bologna." },
    { title: "Eventi passati", url: "/eventi/passati", category: "Eventi", excerpt: "L'archivio delle masterclass, dei workshop e dei concerti che Jam Session APS ha realizzato nel tempo." },
    { title: "News", url: "/news", category: "News", excerpt: "Tutti gli aggiornamenti di Jam Session APS." },
    { title: "Contatti", url: "/contatti", category: "Contatti", excerpt: "Contatta Jam Session APS: sede a Bologna, email, PEC, WhatsApp e modulo per richiedere informazioni su corsi e progetti." },
  ];

  const corsiItems = corsi.map((c) => ({
    title: c.data.title,
    url: `/corsi/${c.id}`,
    category: "Corsi",
    excerpt: c.data.intro,
  }));

  const newsItems = news.map((n) => ({
    title: n.data.title,
    url: `/news/${n.id}`,
    category: "News",
    excerpt: n.data.excerpt || "",
  }));

  const all = [...paginePrincipali, ...corsiItems, ...newsItems];

  return new Response(JSON.stringify(all), {
    headers: { "Content-Type": "application/json" },
  });
}
