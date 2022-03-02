import fs from 'fs';
import path from 'path';

import packageJson from '../package.json';
import { manifest } from '../src/config';

const { version } = packageJson;
const jsonContent = JSON.stringify({ ...manifest, version }, null, 2);

const publicDirPath = path.join(process.cwd(), 'public');
const manifestPath = path.join(publicDirPath, 'manifest.json');

if (!fs.existsSync(publicDirPath)) {
  fs.mkdirSync(publicDirPath);
}

fs.writeFile(manifestPath, jsonContent, 'utf8', err => {
  if (err) {
    console.log(
      'An error occured while writing JSON Object to manifest.json',
    );
    return console.log(err);
  }

  console.log(
    'manifest.json file has been saved with latest version number',
  );
});
