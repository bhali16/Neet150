// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeMermaidClient } from './src/plugins/rehype-mermaid-client.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://bhali16.github.io',
  base: '/Neet150',
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeMermaidClient],
    }),
  },
});
