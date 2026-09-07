import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/_content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: z.array(z.string()),
    draft: z.boolean().default(true),
    pubDate: z.coerce.date(),
  }),
})

export const collections = { posts }
