import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const interests = defineCollection({
  loader: glob({ base: './src/content/interests', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(220),
    category: z.enum(['anime', 'music', 'games', 'shows', 'movies', 'hobbies']),
    status: z.enum([
      'planned',
      'active',
      'in-progress',
      'completed',
      'paused',
      'dropped',
      'favorite',
    ]),
    cover: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const learning = defineCollection({
  loader: glob({ base: './src/content/learning', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(220),
    kind: z.enum(['skill', 'project', 'experiment']),
    status: z.enum(['queued', 'learning', 'building', 'complete', 'paused']),
    progress: z.number().min(0).max(100).optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    repo: z.url().optional(),
    demo: z.url().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { interests, learning, blog };
