import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { toValue, type MaybeRefOrGetter } from 'vue';

import type { ForecastHour } from '@/models/weather';

import { getLocationForecast } from '@/api/weatherService';

interface HourlyForecastKeyArgs {
  filters: MaybeRefOrGetter<{
    q: string;
    days?: number;
    lang?: string;
  }>;
}

export const forecastQueryKeys = {
  hourlyForecast: ({ filters }: HourlyForecastKeyArgs) => ['weather', 'locationForecast', toValue(filters)] as const,
};

export type UseHourlyForecastQueryArgs = Partial<UseQueryOptions<ForecastHour[], Error>> & HourlyForecastKeyArgs;

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
