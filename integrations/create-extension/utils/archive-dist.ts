import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

import { create as createArchive } from 'archiver';

import pkg from '../../../package.json';

const ARCHIVE_DIR = path.resolve(process.cwd(), 'archive');

async function getTargetFilename() {
  const version = pkg.version.replaceAll('.', '-');
  const defaultTargetPath = `${pkg.name}-${version}`;
  const targetRegexp = new RegExp(`^${defaultTargetPath}`);
  const archiveDirFiles = await fsp.readdir(ARCHIVE_DIR);
  const existingTargetFiles = archiveDirFiles.filter(filename =>
    targetRegexp.test(filename),
  );

  const suffix = existingTargetFiles.length
    .toString()
    .padStart(2, '0');

  return `${defaultTargetPath}-${suffix}.zip`;
}

export async function archiveDist(dir: URL) {
  const targetFilename = await getTargetFilename();
  const targetPath = path.resolve(ARCHIVE_DIR, targetFilename);
  const output = fs.createWriteStream(targetPath);
  const archive = createArchive('zip', { zlib: { level: 9 } });

  console.log(`Archiving dist dir to ${targetPath}...`);

  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      'archiver has been finalized and the output file descriptor has closed.',
    );
    console.log(`Extension dir archived: ${targetPath} ✔ `);
  });

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('warning', err => {
    if (err.code === 'ENOENT') console.log(err);
    else throw err;
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(dir.pathname, false);
  await archive.finalize();

  return targetFilename;
}
