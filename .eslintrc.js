const { alias } = require('./.paths');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['prettier', '@typescript-eslint', 'import', 'react'],
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'react/jsx-filename-extension': 0,
    'global-require': 0,
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-nested-ternary': 0,
    'react-hooks/exhaustive-deps': 'off',
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            group: 'external',
            pattern: '{react,react-dom}',
            position: 'before'
          },
          {
            pattern: '{src/**,@atoms/**,@molecules/**,@organisms/**}',
            group: 'external',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    camelcase: 'off',
    'array-callback-return': 0,
    'consistent-return': 0,
    'no-case-declarations': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
      },
      'babel-module': {
        alias,
      },
      react: {
        version: 'detect',
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'airbnb/hooks',
        'plugin:import/typescript',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'prettier/prettier': ['error'],
        'arrow-parens': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-dynamic-require': 0,
        'react/jsx-filename-extension': 0,
        'global-require': 0,
        'no-underscore-dangle': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': 'warn',
        'no-nested-ternary': 0,
        'react-hooks/exhaustive-deps': 'off',
        'import/no-unresolved': [
          2,
          {
            commonjs: true,
            amd: true,
          },
        ],
        camelcase: 'off',
        'array-callback-return': 0,
        'consistent-return': 0,
        'no-case-declarations': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'arrow-body-style': 'off',
        'global-require': 0,
        'no-console': 'warn',
        'no-underscore-dangle': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': 'warn',
        'no-nested-ternary': 0,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': [0],
        'react/destructuring-assignment': 0,
        'react/no-array-index-key': [0],
        'react/jsx-props-no-spreading': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-access-state-in-setstate': 0,
        'react/jsx-curly-newline': 0,
        'react/display-name': 0,
        'react/require-default-props': 0,
        'react/jsx-indent': 'off',
        'react/no-danger': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variableLike',
            format: [
              'camelCase',
              'UPPER_CASE',
              'snake_case',
              'PascalCase',
            ],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase', 'camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
        ],
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: false,
            types: {
              String: {
                message: 'Use string instead',
                fixWith: 'string',
              },
              Boolean: {
                message: 'Use boolean instead',
                fixWith: 'boolean',
              },
              Number: {
                message: 'Use number instead',
                fixWith: 'number',
              },
              Symbol: {
                message: 'Use symbol instead',
                fixWith: 'symbol',
              },

              Function: {
                message: [
                  'The `Function` type accepts any function-like value.',
                  'It provides no type safety when calling the function, which can be a common source of bugs.',
                  'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
                  'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
                ].join('\n'),
              },

              // object typing
              Object: {
                message: [
                  'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
                  '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
                  '- If you want a type meaning "any value", you probably want `unknown` instead.',
                ].join('\n'),
              },
              object: {
                message: [
                  'The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).',
                  'Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.',
                ].join('\n'),
              },
            },
          },
        ],
      },
    },
    {
      files: ['**/*.js', '*.js'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        project: './tsconfig.json',
        requireConfigFile: false,
      },
      extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
      ],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': ['error'],
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-dynamic-require': 0,
        'react/jsx-filename-extension': 0,
        'global-require': 0,
        'no-underscore-dangle': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': 'warn',
        'no-nested-ternary': 0,
        'react-hooks/exhaustive-deps': 'off',
        'import/no-unresolved': [
          2,
          {
            commonjs: true,
            amd: true,
          },
        ],
        camelcase: 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'array-callback-return': 0,
        'consistent-return': 0,
        'no-case-declarations': 'off',
        'react/jsx-indent': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/await-thenable': 'off',
      },
    },
  ],
};
