import fsp from 'fs/promises';
import path from 'path';

import type { AstroIntegration, ViteUserConfig } from 'astro';

import {
  IS_EXTENSION,
  REPOSITORY_URL,
  webAppManifest,
} from '../config';

function logError(error: unknown) {
  console.log(
    'An error occured while writing JSON Object to manifest.json',
    error,
  );
}

async function createManifestFile(remainingError = 1) {
  const publicDirPath = path.join(process.cwd(), 'public');
  const manifestPath = path.join(publicDirPath, 'manifest.json');
  try {
    await fsp.writeFile(
      manifestPath,
      JSON.stringify(webAppManifest),
      'utf-8',
    );
    console.log(
      'manifest.json file has been saved with latest version number',
    );
  } catch (error) {
    if (remainingError <= 0) return logError(error);
    fsp
      .mkdir(publicDirPath)
      .then(() => createManifestFile(remainingError - 1))
      .catch(logError);
  }
}

const viteConfig: ViteUserConfig = {
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(
      webAppManifest.version,
    ),
    'import.meta.env.APP_NAME': JSON.stringify(
      webAppManifest.short_name,
    ),
    'import.meta.env.DESCRIPTION': JSON.stringify(
      webAppManifest.description,
    ),
    'import.meta.env.IS_EXTENSION': JSON.stringify(IS_EXTENSION),
    'import.meta.env.THEME_COLOR': JSON.stringify(
      webAppManifest.theme_color,
    ),
    'import.meta.env.REPOSITORY_URL': JSON.stringify(REPOSITORY_URL),
  },
};

export default function generateManifest(): AstroIntegration {
  return {
    name: 'generate-manifest',
    hooks: {
      'astro:config:setup': async ({ isRestart, updateConfig }) => {
        updateConfig({ vite: viteConfig });
        if (!IS_EXTENSION && !isRestart) await createManifestFile();
      },
    },
  };
}
