import { defineCollection, z } from "astro:content";

const docSchema = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        draft: z.boolean().default(false),
        date: z.date().transform((str) => new Date(str)),
        author: z.enum(["Ashish Verma", "Andrew Schull"]),
        tags: z.array(z.string().optional()),
    }),
});

export const collections = {
    docs: docSchema,
};
