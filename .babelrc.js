const { alias, src } = require('./.paths');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-optional-chaining',
    '@babel/plugin-proposal-optional-chaining',
    'syntax-dynamic-import',
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js'],
        root: [src],
        alias,
      },
    ],
  ],
};
