import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

import createExtension from './integrations/create-extension';
import generateManifest from './integrations/generate-manifest';
import pkg from './package.json';

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  integrations: [svelte(), generateManifest(), createExtension()],
  scopedStyleStrategy: 'class',
  site: pkg.homepage,
  vite: {
    build: {
      assetsInlineLimit: 64_000,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[hash].[ext]',
          chunkFileNames: 'js/c.[hash].js',
          entryFileNames: 'js/e.[hash].js',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '~/styles/mixins.scss';`,
        },
      },
    },
  },
});
