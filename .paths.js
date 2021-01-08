const path = require('path');
const { compilerOptions } = require('./tsconfig.json');

const root = __dirname;
const src = path.join(root, './src');
const entry = path.join(src, '/index.tsx');
const build = path.join(root, './build');
const pathAlias = compilerOptions.paths;

const alias = Object.keys(pathAlias).reduce((obj, key) => {
  const newKey = key.replace('/*', '');
  const value = pathAlias[key][0].replace('/*', '');
  obj[newKey] = path.join(root, value);
  return obj;
}, {});

module.exports = { root, entry, build, alias, src };
