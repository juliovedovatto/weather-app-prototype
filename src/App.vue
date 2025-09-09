<script setup lang="ts">
import { computed, ref } from 'vue';

import { CITY_TABS } from './config';
import { useLocationForecastQuery, type LocationForecastFilters } from './queries/forecast.query';

import type { WeatherCondition, ForecastHour } from '@/models/weather';

import CityTabs from '@/components/CityTabs.vue';
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue';
import ForecastCardsRow from '@/components/ForecastCardsRow.vue';
import HourlyTimeline from '@/components/HourlyTimeline.vue';
import UserName from '@/components/UserName.vue';

const selectedCity = ref(CITY_TABS[0]?.name ?? '');

// Editable user name state
const userName = ref('');

const greeting = computed(() => {
  const hour = new Date().getHours();
  let message = 'Good night';
  let emoji = '🌙';
  switch (true) {
    case hour < 5:
      message = 'Good night';
      emoji = '🌙';
      break;
    case hour < 12:
      message = 'Good morning';
      emoji = '🌞';
      break;
    case hour < 17:
      message = 'Good afternoon';
      emoji = '🌤';
      break;
    case hour < 21:
      message = 'Good evening';
      emoji = '🌆';
      break;
    default:
      message = 'Good night';
      emoji = '🌙';
  }
  return { message, emoji };
});

function onCityChange(city: string) {
  if (selectedCity.value === city) {
    return;
  }
  selectedCity.value = city;
}

const locationForecastFilters = computed<LocationForecastFilters>(() => ({ q: selectedCity.value, days: 5 }));

const locationForecastQuery = useLocationForecastQuery({
  filters: locationForecastFilters,
  throwOnError: false,
});

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

function onRetryForecast() {
  locationForecastQuery.refetch();
}

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
  const hours = [...todayHours, ...nextDayHours];

  return hours;
});
</script>

<template>
  <main class="container flex flex-col gap-12 px-4 py-6 sm:py-14">
    <!-- Welcome headline -->
    <h1 class="text-xl leading-tight font-semibold sm:text-5xl">
      <span>{{ greeting.message }},</span>
      <UserName v-model:name="userName" />
      <span>{{ greeting.emoji }}</span>
    </h1>

    <!-- City Tabs -->
    <CityTabs @change="onCityChange" />

    <template v-if="forecastError">
      <div class="flex items-start gap-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        <span class="flex-1">{{ forecastError }}</span>
        <button type="button" class="shrink-0 font-medium underline hover:text-red-900" @click="onRetryForecast">
          Retry
        </button>
      </div>
    </template>

    <section class="flex flex-col gap-8 md:grid md:grid-cols-[260px_1fr] md:gap-x-7 md:gap-y-0">
      <!-- Current Weather Large Card -->
      <CurrentWeatherCard
        :location="currentLocation"
        :condition="currentLocationCondition"
        :loading="isForecastLoading"
        :location-name="selectedCity"
      />

      <div class="flex h-full flex-col gap-8 sm:justify-between sm:gap-0">
        <!-- Hourly timeline -->
        <HourlyTimeline :conditions="hourlyConditions" :location="currentLocation" :loading="isForecastLoading" />

        <!-- Forecast Cards Row -->
        <ForecastCardsRow :conditions="forecastDayConditions" :loading="isForecastLoading" />
      </div>
    </section>
  </main>
</template>
