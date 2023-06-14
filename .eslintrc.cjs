module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:astro/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/no-unsafe-return': 0,
      },
    },
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['./integrations/**'],
      rules: {
        'no-console': 0,
      },
    },
    {
      files: ['*.cjs', '*.mjs', '*.js'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 0,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    'import',
    'astro',
    'svelte3',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'array-callback-return': 0,
    camelcase: 'off',
    'consistent-return': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': [
      2,
      {
        amd: true,
        commonjs: true,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '{svelte}',
            position: 'before',
          },
          {
            group: 'external',
            pattern: '{~/**}',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['svelte'],
      },
    ],
    'import/prefer-default-export': 0,
    'no-case-declarations': 'off',
    'no-console': 'error',
    'no-nested-ternary': 0,
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 0,
    'prettier/prettier': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'svelte3/typescript': () => require('typescript'),
  },
};
