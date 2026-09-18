// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jamsessionaps.it',
  redirects: {
    '/progetti/incubatore-orchestrale': '/progetti/maia',
  },
  build: {
    // Evita richieste CSS bloccanti per il rendering: il CSS di ogni
    // pagina viene inserito direttamente nell'HTML invece che in un
    // file separato da scaricare prima di disegnare la pagina.
    inlineStylesheets: 'always',
  },
});
