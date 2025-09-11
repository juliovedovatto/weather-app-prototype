<script setup lang="ts">
import { computed, onBeforeMount, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { TabItem } from '@/models/app';

import CityTabs from '@/components/CityTabs.vue';
import CitySearch from '@/components/search/CitySearch.vue';
import WeatherForecast from '@/components/WeatherForecast.vue';
import { CITY_TABS } from '@/config';

defineOptions({ name: 'HomePage' });

const router = useRouter();
const route = useRoute();

const selectedCity = ref('');
const dynamicCities = ref<TabItem[]>([]);

const availableCities = computed<TabItem[]>(() => {
  const items = [...CITY_TABS, ...dynamicCities.value];
  items.forEach((item) => {
    item.selected = item.name === selectedCity.value;
  });
  return items;
});

const location = computed(() => (route.params.query as string) || '');

watchEffect(() => {
  selectedCity.value = location.value || CITY_TABS[0]?.name || '';
});

function onCityAdded(name: string) {
  if (dynamicCities.value.some((c) => c.name === name) || CITY_TABS.some((c) => c.name === name)) {
    return;
  }
  dynamicCities.value.push({ name, label: name });
  selectedCity.value = name;

  router.push({ name: 'location', params: { query: name } });
}

onBeforeMount(() => {
  if (location.value) {
    router.push({ name: 'home' });
  }
});
</script>

<template>
  <div class="flex flex-col gap-12" data-test="home-page">
    <!-- City Tabs -->
    <CityTabs :items="availableCities" />

    <!-- Weather Forecast -->
    <WeatherForecast :city="selectedCity" />

    <!-- City Search -->
    <CitySearch @city-added="onCityAdded" />
  </div>
</template>
