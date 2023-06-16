/* eslint-disable no-console */
import path from 'path';

import { archiveDir, buildDir, manifestPath } from './_paths';
import archiveBuild from './archive-build';
import buildExtension from './build-extension';
import buildManifest from './build-manifest';
import updateReadme from './update-readme';

try {
  console.log('='.repeat(25));
  console.log(`Building extension directory...`);
  const { jsFiles } = await buildExtension();
  console.log(`Extension dir has been built in ${buildDir} ✔ `);

  console.log('='.repeat(25));
  console.log(`Building manifest file for extension...`);
  await buildManifest({ jsFiles });
  console.log(`manifest file generated: ${manifestPath} ✔ `);

  console.log('='.repeat(25));
  console.log(`Archiving extension directory...`);
  const archivedFileName = await archiveBuild();
  console.log(
    `Extension dir archived: ${path.join(
      archiveDir,
      archivedFileName,
    )} ✔ `,
  );

  console.log('='.repeat(25));
  console.log(`Updating README.md file...`);
  await updateReadme(archivedFileName);
  console.log('='.repeat(25));
} catch (error) {
  console.log(error);
}
