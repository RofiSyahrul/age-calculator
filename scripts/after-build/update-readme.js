/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

module.exports = (archiveFileName = '') => {
  const readmePath = path.resolve(process.cwd(), './README.md');
  const readme = fs.readFileSync(readmePath, { encoding: 'utf8' });
  const newReadme = readme.replace(
    /age-calculator-\d*-\d*-\d*-\d*\.zip/,
    archiveFileName,
  );

  fs.writeFileSync(readmePath, newReadme, { encoding: 'utf8' });

  console.log(
    `README.md has been updated with new archived file link ${archiveFileName}`,
  );
};
