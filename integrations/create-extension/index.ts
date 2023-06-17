import type { AstroConfig, AstroIntegration } from 'astro';

import { archiveDist } from './utils/archive-dist';
import { copyPublicDir } from './utils/copy-public-dir';
import { createManifest } from './utils/create-manifest';
import { moveInlineScripts } from './utils/move-inline-scripts';
import { updateReadme } from './utils/update-readme';
import { IS_EXTENSION } from '../config';

export default function createExtension(): AstroIntegration {
  let astroConfig: AstroConfig;

  return {
    name: 'create-extension',
    hooks: {
      'astro:config:done': ({ config }) => {
        astroConfig = config;
      },
      'astro:build:setup': ({ vite }) => {
        vite.build ??= {};
        vite.build.copyPublicDir = !IS_EXTENSION;
      },
      'astro:build:done': async ({ dir }) => {
        if (!IS_EXTENSION) return;

        try {
          await Promise.all([
            copyPublicDir(astroConfig.publicDir, dir),
            createManifest(dir),
            moveInlineScripts(dir),
          ]);

          const archivedFilename = await archiveDist(dir);
          await updateReadme(archivedFilename);
        } catch (error) {
          console.log('ERROR on creating extension', error);
        }
      },
    },
  };
}
