/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { name, version } = require('./package.json');

function removeExistingTargetZip() {
  const targetRegexp = new RegExp(name, 'g');
  const folderfiles = fs.readdirSync('./');
  const targetFiles = folderfiles
    .filter(file => targetRegexp.test(file))
    .map(file => path.resolve(__dirname, file));
  targetFiles.forEach(fs.unlinkSync);
}

module.exports = () => {
  removeExistingTargetZip();
  const target = path.join(
    __dirname,
    `${name}-${version.replace(/\./g, '-')}.zip`,
  );
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
  archive.directory('./build', false);
  archive.finalize();
};
