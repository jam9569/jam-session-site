import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const corsi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/corsi' }),
  schema: z.object({
    title: z.string(),
    strumento: z.string(),
    ordine: z.number(),
    intro: z.string(),
    kicker: z.string().optional(),
    immagine: z.string().optional(),
    video: z.string().optional(),
    fasce_eta: z.array(
      z.object({
        nome: z.string(),
        range: z.string(),
      })
    ).optional(),
    livelli: z.array(
      z.object({
        nome: z.string(),
        descrizione: z.string(),
      })
    ).optional(),
    metodo: z.string(),
    team: z.array(
      z.object({
        nome: z.string(),
        ruolo: z.string(),
        tratto: z.string().optional(),
      })
    ).optional(),
    nota_team: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string().optional(),
  }),
});

// Foto delle varie edizioni di Voglio Live. Per aggiungerne una basta creare un nuovo file
// .md in src/content/voglio-live-foto con lo stesso formato: non serve toccare il codice.
const voglioLiveFoto = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/voglio-live-foto' }),
  schema: z.object({
    anno: z.number(),
    immagine: z.string(),
    didascalia: z.string(),
    ordine: z.number().optional(),
  }),
});

export const collections = { corsi, news, voglioLiveFoto };