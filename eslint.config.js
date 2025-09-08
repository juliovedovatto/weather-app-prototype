import { fileURLToPath, URL } from 'node:url';

import eslint from '@eslint/js';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import betterTailwindCSSPlugin from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
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
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {},
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    plugins: {
      'better-tailwindcss': betterTailwindCSSPlugin,
    },
    rules: {
      ...betterTailwindCSSPlugin.configs['recommended-warn'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: fileURLToPath(new URL('./src/styles.css', import.meta.url)),
      },
    },
  },
]);
