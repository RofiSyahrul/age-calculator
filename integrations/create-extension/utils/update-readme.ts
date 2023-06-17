import fsp from 'fs/promises';
import path from 'path';

const README_PATH = path.resolve(process.cwd(), 'README.md');

export async function updateReadme(archivedFilename: string) {
  console.log(`Updating README.md file...`);

  const readme = await fsp.readFile(README_PATH, {
    encoding: 'utf8',
  });
  const newReadme = readme.replace(
    /age-calculator-\d*-\d*-\d*-\d*\.zip/,
    archivedFilename,
  );

  await fsp.writeFile(README_PATH, newReadme, { encoding: 'utf8' });

  console.log(
    `README.md has been updated with new archived file link ${archivedFilename}`,
  );
}
