import fsp from 'fs/promises';
import path from 'path';

import { webAppManifest } from '../../config';

export async function copyPublicDir(publicDir: URL, distDir: URL) {
  const filesToCopy = [
    ...webAppManifest.icons.map(icon => icon.src),
    '/favicon.ico',
  ];

  console.log(
    `Copying public dir files (${filesToCopy.join(', ')})...`,
  );

  await Promise.all(
    filesToCopy.map(async filename => {
      const sourceFilePath = path.join(publicDir.pathname, filename);
      const destinationFilePath = path.join(
        distDir.pathname,
        filename,
      );
      try {
        await fsp.copyFile(sourceFilePath, destinationFilePath);
      } catch {
        const dir = path.dirname(destinationFilePath);
        await fsp.mkdir(dir, { recursive: true });
        await fsp.copyFile(sourceFilePath, destinationFilePath);
      }
    }),
  );

  console.log(
    `Public dir files (${filesToCopy.join(', ')}) copied to dist dir`,
  );
}
