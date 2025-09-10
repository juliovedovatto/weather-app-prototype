import { vi } from 'vitest';

import type { Ref } from 'vue';

vi.mock('@vueuse/core', () => ({
  useDebounce: <T>(r: Ref<T>) => r,
}));
