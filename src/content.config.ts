import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonSchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  date: z.coerce.date(),
  featured: z.boolean().default(false),
  externalUrl: z.url().optional(),
  cover: z.string().optional(),
});

const bookmarks = defineCollection({
  loader: glob({ base: './src/content/bookmarks', pattern: '**/*.md' }),
  schema: commonSchema.extend({
    externalUrl: z.url(),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: commonSchema,
});

const quotes = defineCollection({
  loader: glob({ base: './src/content/quotes', pattern: '**/*.md' }),
  schema: commonSchema,
});

const essays = defineCollection({
  loader: glob({ base: './src/content/essays', pattern: '**/*.md' }),
  schema: commonSchema,
});

export const collections = {
  bookmarks,
  notes,
  quotes,
  essays,
};
