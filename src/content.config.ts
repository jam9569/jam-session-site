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
    ),
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

export const collections = { corsi, news };