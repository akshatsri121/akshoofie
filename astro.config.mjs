import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://akshoofie.vercel.app',
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'vesper',
      wrap: true,
    },
  },
});
