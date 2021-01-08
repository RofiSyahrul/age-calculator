const fs = require('fs');
const packageJson = require('./package.json');
const manifestJson = require('./public/manifest.json');

const { version } = packageJson;
const jsonContent = JSON.stringify(
  { ...manifestJson, version },
  null,
  2,
);

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

fs.writeFile('./public/manifest.json', jsonContent, 'utf8', err => {
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
