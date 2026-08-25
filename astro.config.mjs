import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    // Vite 8's dep optimizer inlines `process.env.NODE_ENV` when pre-bundling
    // CJS packages. If that value is "production" (e.g. after `astro build`
    // in the same environment, or a poisoned `node_modules/.vite` cache),
    // `react/jsx-dev-runtime` resolves to the production stub where `jsxDEV`
    // is undefined — hydration then throws and every button is dead.
    // optimizeDeps only runs in `astro dev`, so pinning development here is
    // correct and keeps the JSX transform's `_jsxDEV` calls working.
    optimizeDeps: {
      rolldownOptions: {
        transform: {
          define: {
            'process.env.NODE_ENV': JSON.stringify('development'),
          },
        },
      },
    },
  },
});
