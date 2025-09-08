import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { toValue, type MaybeRefOrGetter } from 'vue';

import type { ForecastHour } from '@/models/weather';

import { getLocationForecast } from '@/api/weatherService';

export interface LocationForecastFilters {
  q: string;
  days?: number;
  lang?: string;
}

interface HourlyForecastKeyArgs {
  filters: MaybeRefOrGetter<LocationForecastFilters>;
}

export const forecastQueryKeys = {
  hourlyForecast: ({ filters }: HourlyForecastKeyArgs) => ['weather', 'locationForecast', filters] as const,
};

type UseHourlyForecastQueryArgs = Partial<UseQueryOptions<ForecastHour[], Error>> & HourlyForecastKeyArgs;

/**
 * Query to fetch weather forecast for a location.
 */
export const useLocationForecastQuery = ({ filters, ...options }: UseHourlyForecastQueryArgs) => {
  return useQuery({
    queryKey: forecastQueryKeys.hourlyForecast({ filters }),
    queryFn: async () => {
      const { q, days, lang } = toValue(filters);

      const result = await getLocationForecast(toValue(q), { days, lang });

      return result;
    },
    ...options,
  });
};
