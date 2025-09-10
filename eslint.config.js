import { fileURLToPath, URL } from 'node:url';

import eslint from '@eslint/js';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import betterTailwindCSSPlugin from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default defineConfigWithVueTs([
  {
    ignores: ['*.d.ts', 'dist/**', 'node_modules/**', '.history'],
  },
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  vueTsConfigs.recommended,
  eslintPluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      // General safety rules
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-var': 'error',

      // Style & consistency
      'no-multi-spaces': [
        'error',
        {
          ignoreEOLComments: true,
          exceptions: { ImportDeclaration: true, VariableDeclarator: true, Property: true },
        },
      ],
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-exponentiation-operator': 'error',
      'prefer-template': 'error',
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'], markers: ['/'] }],
      yoda: ['error', 'never'],

      // Extra recommended
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unsafe-optional-chaining': 'error',
      'dot-notation': 'error',
      'object-shorthand': 'error',

      // Return-await behavior
      'no-return-await': 'off', // disable core opposite
      '@typescript-eslint/return-await': ['error', 'always'],
    },
  },
  {
    plugins: {
      import: importPlugin,
      'better-tailwindcss': betterTailwindCSSPlugin,
    },
    rules: {
      ...betterTailwindCSSPlugin.configs['recommended-warn'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: fileURLToPath(new URL('./src/styles.css', import.meta.url)),
      },
    },
  },
  {
    files: ['tests/e2e/**/*.test.ts'],
    plugins: { playwright },
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // custom tweaks if needed
      'playwright/no-skipped-test': 'error',
    },
  },
]);
