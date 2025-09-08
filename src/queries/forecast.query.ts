import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { toValue, type MaybeRefOrGetter } from 'vue';

import type { ForecastResponse } from '@/models/weather';

import { getLocationForecast } from '@/api/weatherService';

export interface LocationForecastFilters {
  q: string;
  days?: number;
  lang?: string;
}

interface LocationForecastKeyArgs {
  filters: MaybeRefOrGetter<LocationForecastFilters>;
}

export const forecastQueryKeys = {
  locationForecast: ({ filters }: LocationForecastKeyArgs) => ['weather', 'locationForecast', filters] as const,
};

type UseLocationForecastQueryArgs = Partial<UseQueryOptions<ForecastResponse, Error>> & LocationForecastKeyArgs;

/**
 * Query to fetch weather forecast (full forecast response including current + forecast days).
 */
export const useLocationForecastQuery = ({ filters, ...options }: UseLocationForecastQueryArgs) => {
  return useQuery({
    queryKey: forecastQueryKeys.locationForecast({ filters }),
    queryFn: async () => {
      const { q, days, lang } = toValue(filters);
      const result = await getLocationForecast(toValue(q), { days, lang });
      return result;
    },
    ...options,
  });
};
