import { flushPromises } from '@vue/test-utils';
import { beforeEach, afterEach, vi } from 'vitest';

import type { Ref } from 'vue';

import queryClient from '@/queries/client';

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()}`);
  });
}

// Mocks

vi.mock('@vueuse/core', () => ({
  useDebounce: <T>(r: Ref<T>) => r,
}));

// Lifecycle hooks

beforeEach(() => {
  queryClient.clear();
});

afterEach(async () => {
  // Prevent instances of UnmockedRequestError between tests
  await flushPromises();

  window.localStorage.clear();
  clearCookies();
});
