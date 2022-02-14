/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const archiver = require('archiver');

const { name, version } = require('../../package.json');

const archiveDir = path.resolve(process.cwd(), 'archive');
const buildDir = path.resolve(process.cwd(), 'build');

async function getTargetFileName() {
  const defaultTargetPath = `${name}-${version.replace(/\./g, '-')}`;
  const targetRegexp = new RegExp(`^${defaultTargetPath}`);
  const archiveDirFiles = await promisify(fs.readdir)(archiveDir);
  const existingTargetFiles = archiveDirFiles.filter(fileName =>
    targetRegexp.test(fileName),
  );

  const suffix = `${existingTargetFiles.length}`.padStart(2, '0');
  return `${defaultTargetPath}-${suffix}.zip`;
}

module.exports = async () => {
  const targetFileName = await getTargetFileName();
  const target = path.join(archiveDir, targetFileName);
  const output = fs.createWriteStream(target);
  const archive = archiver('zip', {
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

  archive.pipe(output);
  archive.directory(buildDir, false);
  archive.finalize();

  return targetFileName;
};
