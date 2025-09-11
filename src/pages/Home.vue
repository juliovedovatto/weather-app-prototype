<script setup lang="ts">
import { computed, ref } from 'vue';

import type { TabItem } from '@/models/app';

import CityTabs from '@/components/CityTabs.vue';
import CitySearch from '@/components/search/CitySearch.vue';
import WeatherForecast from '@/components/WeatherForecast.vue';
import { CITY_TABS } from '@/config';

defineOptions({ name: 'HomePage' });

const selectedCity = ref(CITY_TABS[0]?.name ?? '');
const dynamicCities = ref<TabItem[]>([]);

const availableCities = computed<TabItem[]>(() => {
  const items = [...CITY_TABS, ...dynamicCities.value];
  items.forEach((item) => {
    item.selected = item.name === selectedCity.value;
  });
  return items;
});

function onCityAdded(name: string) {
  if (dynamicCities.value.some((c) => c.name === name) || CITY_TABS.some((c) => c.name === name)) {
    return;
  }
  dynamicCities.value.push({ name, label: name });
  selectedCity.value = name;
}

function onTabSelected(city: string) {
  if (selectedCity.value === city) {
    return;
  }
  selectedCity.value = city;
}
</script>

<template>
  <div class="flex flex-col gap-12" data-test="home-page">
    <!-- City Tabs -->
    <CityTabs :items="availableCities" @tab-selected="onTabSelected" />

    <!-- Weather Forecast -->
    <WeatherForecast :city="selectedCity" />

    <!-- City Search -->
    <CitySearch @city-added="onCityAdded" />
  </div>
</template>
