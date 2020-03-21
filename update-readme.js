/* eslint-disable no-console */
const fs = require('fs');

module.exports = () => {
  const { version } = require('./package.json');
  const readme = fs.readFileSync('./README.md', { encoding: 'utf8' });
  const newReadme = readme.replace(
    /-\d*-\d*-\d*/g,
    `-${version.replace(/\./g, '-')}`
  );

  fs.writeFileSync('./README.md', newReadme, { encoding: 'utf8' });

  console.log(
    `README.md has been updated with new archived file link, version ${version}`
  );
};
