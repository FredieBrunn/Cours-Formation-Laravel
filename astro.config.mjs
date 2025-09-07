// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// site: 'https://example.com',
	// integrations: [mdx(), sitemap()],

	// Configuration pour Render
  output: 'static', // ou 'server' si vous avez besoin de SSR
  site: 'https://votre-app.onrender.com', // Remplacez par votre URL Render
  
  // Optimisations pour le build
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Configuration des assets
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    }
  }
});
