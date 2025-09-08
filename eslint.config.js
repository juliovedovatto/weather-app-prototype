// @ts-check
import importPlugin from 'eslint-plugin-import';
import vue from 'eslint-plugin-vue';
import globals from 'globals'
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    rules: {},
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  },
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/order': [
        'warn',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          'newlines-between': 'always',
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
        }
      ]
    }
  }
];
