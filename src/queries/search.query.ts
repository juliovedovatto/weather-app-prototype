import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { toValue, type MaybeRefOrGetter } from 'vue';

import type { SearchLocationResult } from '@/models/weather';

import { searchLocations } from '@/api/weatherService';

export interface CitySearchFilters {
  term: string;
}

interface CitySearchKeyArgs {
  filters: MaybeRefOrGetter<CitySearchFilters>;
}

export const citySearchKeys = {
  search: ({ filters }: CitySearchKeyArgs) => ['citySearch', filters] as const,
};

type UseCitySearchArgs = Partial<UseQueryOptions<SearchLocationResult[], Error>> & CitySearchKeyArgs;

export function useCitySearchQuery({ filters, ...options }: UseCitySearchArgs) {
  return useQuery({
    queryKey: citySearchKeys.search({ filters }),
    queryFn: async ({ signal }) => {
      const { term } = toValue(filters);
      const value = toValue(term).trim();
      if (!value) {
        return [];
      }
      // Pass signal so axios can cancel if the query key changes mid-flight
      return await searchLocations(value, { signal });
    },
    ...options,
  });
}
