import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-console
  console.log(`Vite mode: ${mode}`);

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [vue(), tailwindcss()],
    test: {
      environment: 'jsdom',
      globals: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
      testTimeout: 10000,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      setupFiles: ['tests/setup-env.ts'],
    },
  };
});
