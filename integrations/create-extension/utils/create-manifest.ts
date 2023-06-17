import fsp from 'fs/promises';
import path from 'path';

import { extensionManifest } from '../../config';

export async function createManifest(distDir: URL) {
  console.log('Creating manifest.json file...');

  const manifest = structuredClone(extensionManifest);
  const manifestFilename = path.join(
    distDir.pathname,
    'manifest.json',
  );

  const stringifiedManifest = JSON.stringify(manifest, null, 2);
  await fsp.writeFile(manifestFilename, stringifiedManifest, 'utf8');

  console.log(
    `manifest.json file created in ${manifestFilename} with content`,
  );
}
