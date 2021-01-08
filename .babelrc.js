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
    'goods-core/babel/preset',
    'goods-ui/babel/preset',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
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
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'icons',
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
