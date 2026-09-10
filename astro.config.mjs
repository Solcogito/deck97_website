import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://deck97game.com',
  output: 'static',
  integrations: [sitemap()],
});
