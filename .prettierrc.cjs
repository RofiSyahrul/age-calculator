/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  jsxSingleQuote: true,
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  plugins: [require.resolve('prettier-plugin-astro')],
  printWidth: 70,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};
