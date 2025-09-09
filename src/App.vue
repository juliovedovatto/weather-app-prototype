<script setup lang="ts">
import { computed, ref } from 'vue';

import { useLocationForecastQuery, type LocationForecastFilters } from './queries/forecast.query';

import type { WeatherCondition, ForecastHour } from '@/models/weather';

import CityTabs from '@/components/CityTabs.vue';
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue';
import ForecastCardsRow from '@/components/ForecastCardsRow.vue';
import HourlyTimeline from '@/components/HourlyTimeline.vue';

const selectedCity = ref('Denver');

function onCityChange(city: string) {
  if (selectedCity.value === city) {
    return;
  }
  selectedCity.value = city;
}

const locationForecastFilters = computed<LocationForecastFilters>(() => ({ q: selectedCity.value, days: 5 }));

const locationForecastQuery = useLocationForecastQuery({
  filters: locationForecastFilters,
});

const isForecastLoading = computed(
  () => locationForecastQuery.isFetching.value || locationForecastQuery.isLoading.value,
);

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
    <h1 class="text-xl leading-tight font-semibold sm:text-5xl">Good afternoon, Samantha 🌞</h1>

    <!-- City Tabs -->
    <CityTabs @change="onCityChange" />

    <section class="flex flex-col gap-8 md:grid md:grid-cols-[260px_1fr] md:gap-x-7 md:gap-y-0">
      <!-- Current Weather Large Card -->
      <CurrentWeatherCard
        :location="currentLocation"
        :condition="currentLocationCondition"
        :loading="isForecastLoading"
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
