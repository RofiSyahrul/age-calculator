import { fileURLToPath } from 'url';

import type { AstroIntegration } from 'astro';

import { IS_EXTENSION, extensionManifest } from '../config';

export default function createExtension(): AstroIntegration {
  return {
    name: 'create-extension',
    hooks: {
      'astro:build:done': ({ dir }) => {
        if (!IS_EXTENSION) return;
        const manifest = structuredClone(extensionManifest);
        // TODO: create extension
        console.log('DIR', dir);
        console.log('DIR PATH', fileURLToPath(dir));
        console.log('MANIFEST', manifest);
      },
    },
  };
}
