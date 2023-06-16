/* eslint-disable no-console */
import { readFile, writeFile } from 'fs/promises';

import { readmePath } from './_paths';

export default async function updateReadme(archiveFileName = '') {
  const readme = await readFile(readmePath, {
    encoding: 'utf8',
  });
  const newReadme = readme.replace(
    /age-calculator-\d*-\d*-\d*-\d*\.zip/,
    archiveFileName,
  );

  await writeFile(readmePath, newReadme, { encoding: 'utf8' });

  console.log(
    `README.md has been updated with new archived file link ${archiveFileName}`,
  );
}
