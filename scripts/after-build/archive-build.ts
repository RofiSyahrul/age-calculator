/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';

import * as archiver from 'archiver';

import { archiveDir, buildDir } from './_paths';
import { name, version } from '../../package.json';

async function getTargetFileName() {
  const defaultTargetPath = `${name}-${version.replace(/\./g, '-')}`;
  const targetRegexp = new RegExp(`^${defaultTargetPath}`);
  const archiveDirFiles = await readdir(archiveDir);
  const existingTargetFiles = archiveDirFiles.filter(fileName =>
    targetRegexp.test(fileName),
  );

  const suffix = `${existingTargetFiles.length}`.padStart(2, '0');
  return `${defaultTargetPath}-${suffix}.zip`;
}

export default async function archiveBuild() {
  const targetFileName = await getTargetFileName();
  const target = path.join(archiveDir, targetFileName);
  const output = fs.createWriteStream(target);
  const archive = archiver.create('zip', {
    zlib: { level: 9 },
  });

  console.log(`Archiving build directory to ${target}...`);

  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
      'archiver has been finalized and the output file descriptor has closed.',
    );
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

  archive.pipe(output as unknown as NodeJS.WritableStream);
  archive.directory(buildDir, false);
  await archive.finalize();

  return targetFileName;
}
