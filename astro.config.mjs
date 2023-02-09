import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [remarkToc]
  },
  integrations: [tailwind(), react()]
});