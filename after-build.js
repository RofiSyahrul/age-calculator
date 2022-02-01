const fs = require('fs');
const path = require('path');

const archiveBuild = require('./archive-build');
const { icons } = require('./public/manifest.json');
const updateReadme = require('./update-readme');

if (!fs.existsSync('./build')) {
  fs.mkdirSync('./build');
}

const jsFiles = fs.readdirSync('./build/js');
const manifestPath = path.join(__dirname, 'build', 'manifest.json');
const manifestJson =
  fs.readFileSync(manifestPath, {
    encoding: 'utf8',
  }) || '{}';
const manifest = JSON.parse(manifestJson);

manifest.manifest_version = 2;
manifest.icons = { 192: icons[0].src, 512: icons[1].src };
manifest.chrome_url_overrides = { newtab: 'index.html' };
manifest.permissions = ['storage'];
manifest.browser_action = {};
manifest.content_security_policy =
  "script-src 'self' 'sha256-FyiKpy3PpN1/MM6lBhmjdt7P5PXAcmjHEWQr2bhYhkk='; style-src 'self' 'unsafe-inline'; object-src 'self'; img-src 'self' data:; default-src 'self' 'unsafe-inline'";
manifest.content_scripts = [
  {
    matches: ['http://google.com/*', 'https://google.com/*'],
    js: jsFiles.map(str => `/js/${str}`),
  },
];
delete manifest.theme_color;
delete manifest.background_color;
delete manifest.start_url;
delete manifest.display;

fs.writeFileSync(
  manifestPath,
  JSON.stringify(manifest, null, 2),
  'utf8',
);

archiveBuild();
updateReadme();
