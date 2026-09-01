import { defineCollection, z } from 'astro:content';

const corsi = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    strumento: z.string(),
    ordine: z.number(),
    intro: z.string(),
    livelli: z.array(
      z.object({
        nome: z.string(),
        descrizione: z.string(),
      })
    ),
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

export const collections = { corsi };