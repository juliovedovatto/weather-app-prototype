<script setup lang="ts">
import { computed } from 'vue';

import type { WeatherCondition, ForecastHour } from '@/models/weather';

import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue';
import ForecastCardsRow from '@/components/ForecastCardsRow.vue';
import HourlyTimeline from '@/components/HourlyTimeline.vue';
import { useLocationForecastQuery, type LocationForecastFilters } from '@/queries/forecast.query';

// Props
const props = defineProps<{ city: string }>();

// Build filters for forecast query
const locationForecastFilters = computed<LocationForecastFilters>(() => ({ q: props.city, days: 5 }));

// Query
const locationForecastQuery = useLocationForecastQuery({
  filters: locationForecastFilters,
  throwOnError: false,
});

// State derivations
const isForecastLoading = computed(
  () => locationForecastQuery.isFetching.value || locationForecastQuery.isLoading.value,
);

const forecastError = computed(() => {
  if (!locationForecastQuery.isError.value) {
    return null;
  }
  const err = locationForecastQuery.error.value as unknown;
  if (
    typeof err === 'object' &&
    err &&
    'message' in err &&
    typeof (err as { message?: unknown }).message === 'string'
  ) {
    return (err as { message: string }).message;
  }
  return 'Failed to load forecast data. Please try again.';
});

const currentLocationCondition = computed<WeatherCondition | null>(() => {
  if (locationForecastQuery.isFetching.value || locationForecastQuery.isError.value) {
    return null;
  }
  const data = locationForecastQuery.data.value;
  if (!data) {
    return null;
  }
  return { condition: data.current.condition, temperature: data.current.temp_c };
});

const forecastDayConditions = computed<WeatherCondition[]>(() => {
  if (locationForecastQuery.isFetching.value || locationForecastQuery.isError.value) {
    return [];
  }
  return (
    locationForecastQuery.data.value?.forecast.forecastday.map((d) => ({
      condition: d.day.condition,
      temperature: d.day.avgtemp_c,
    })) ?? []
  );
});

const currentLocation = computed(() => {
  if (locationForecastQuery.isFetching.value || locationForecastQuery.isError.value) {
    return null;
  }
  return locationForecastQuery.data.value?.location ?? null;
});

const hourlyConditions = computed<ForecastHour[]>(() => {
  if (locationForecastQuery.isFetching.value || locationForecastQuery.isError.value) {
    return [];
  }
  const data = locationForecastQuery.data.value;
  if (!data || !currentLocation.value) {
    return [];
  }
  const todayHours = data.forecast.forecastday[0]?.hour ?? [];
  const nextDayHours = data.forecast.forecastday[1]?.hour ?? [];
  return [...todayHours, ...nextDayHours];
});

function onRetryForecast() {
  locationForecastQuery.refetch();
}
</script>

<template>
  <div class="flex flex-col gap-8" data-test="weather-forecast">
    <template v-if="forecastError">
      <div class="flex items-start gap-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        <span class="flex-1">{{ forecastError }}</span>
        <button type="button" class="shrink-0 font-medium underline hover:text-red-900" @click="onRetryForecast">
          Retry
        </button>
      </div>
    </template>

    <section class="flex flex-col gap-8 md:grid md:grid-cols-[260px_1fr] md:gap-x-7 md:gap-y-0">
      <CurrentWeatherCard
        :location="currentLocation"
        :condition="currentLocationCondition"
        :loading="isForecastLoading"
        :location-name="props.city"
      />

      <div class="flex h-full flex-col gap-8 sm:justify-between sm:gap-0">
        <HourlyTimeline :conditions="hourlyConditions" :location="currentLocation" :loading="isForecastLoading" />
        <ForecastCardsRow :conditions="forecastDayConditions" :loading="isForecastLoading" />
      </div>
    </section>
  </div>
</template>
