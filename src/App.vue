<script setup lang="ts">
import { fromUnixTime, startOfHour } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { computed, ref } from 'vue';

import { useLocationForecastQuery, type LocationForecastFilters } from './queries/forecast.query';

import type { WeatherCondition, HourlyWeatherCondition } from '@/models/weather';

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

const nowDate = computed(() => toZonedTime(new Date(), currentLocation.value?.tz_id || ''));

const hourlyConditions = computed<HourlyWeatherCondition[]>(() => {
  if (locationForecastQuery.isFetching.value || locationForecastQuery.isError.value) {
    return [];
  }
  const data = locationForecastQuery.data.value;
  if (!data || !currentLocation.value) {
    return [];
  }

  const nowEpoch = Math.floor(nowDate.value.getTime() / 1000);

  const date = fromUnixTime(nowEpoch);
  const nowHour = startOfHour(date);

  const todayHours = data.forecast.forecastday[0]?.hour ?? [];
  const nextDayHours = data.forecast.forecastday[1]?.hour ?? [];
  const hours = [...todayHours, ...nextDayHours];

  if (!hours.length) {
    return [];
  }

  const filteredTime = hours.filter((h) => {
    const time = toZonedTime(fromUnixTime(h.time_epoch), currentLocation.value?.tz_id || '');

    return time >= nowHour;
  });

  return filteredTime.slice(0, 5).map((h) => ({
    timeEpoch: h.time_epoch,
    time: h.time,
    condition: h.condition,
    temperature: h.temp_c,
  }));
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
        <HourlyTimeline :conditions="hourlyConditions" :location="currentLocation" />

        <!-- Forecast Cards Row -->
        <ForecastCardsRow :conditions="forecastDayConditions" :loading="isForecastLoading" />
      </div>
    </section>
  </main>
</template>
