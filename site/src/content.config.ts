import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const problems = defineCollection({
  loader: glob({
    pattern: '[0-9][0-9]-*/[0-9]*.md',
    base: '../',
  }),
  schema: z.object({}),
});

export const collections = { problems };
