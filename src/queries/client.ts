import { QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min fresh
      gcTime: 1000 * 60 * 5, // 5 min cache retention
      retry: false,
      retryOnMount: false,
      throwOnError: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
