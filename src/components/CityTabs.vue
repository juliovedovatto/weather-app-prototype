<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import type { TabItem } from '@/models/app';

export interface CityTabsProps {
  items: TabItem[];
}

const props = defineProps<CityTabsProps>();

const selectedItem = ref('');
const route = useRoute();

watch(
  () => props.items,
  (value) => {
    if (!value.length) {
      selectedItem.value = '';
      return;
    }
    // Prefer route query if present
    const routeCity = typeof route.query.city === 'string' ? route.query.city : null;
    if (routeCity && value.some((i) => i.name === routeCity)) {
      selectedItem.value = routeCity;
      return;
    }
    const selected = value.find((i) => i.selected);
    if (selected && selected.name !== selectedItem.value) {
      selectedItem.value = selected.name;
    } else if (!value.some((i) => i.name === selectedItem.value)) {
      const first = value[0];
      if (first) {
        selectedItem.value = first.name;
      }
    }
  },
  { immediate: true },
);

// Watch route query location changes
watch(
  () => route.params.query,
  (location) => {
    if (typeof location === 'string' && location && location !== selectedItem.value) {
      selectedItem.value = location;
    }
  },
);

function isSelectedItem(item: TabItem) {
  return item.name === selectedItem.value;
}

onBeforeMount(() => {
  const routeLocation = typeof route.params.query === 'string' ? route.params.query : '';
  selectedItem.value =
    (routeLocation && props.items.find((i) => i.name === routeLocation)?.name) ||
    props.items.find((i) => i.selected)?.name ||
    props.items[0]?.name ||
    '';
});
</script>

<template>
  <nav
    data-test="city-tabs"
    aria-label="Select city"
    role="tablist"
    class="-mx-4 flex gap-2 overflow-x-auto px-4 py-2 whitespace-nowrap sm:mx-0 sm:overflow-visible sm:px-0"
  >
    <RouterLink
      v-for="item in props.items"
      :key="item.name"
      :to="{ name: 'location', params: { query: item.name } }"
      role="tab"
      :aria-selected="isSelectedItem(item)"
      class="cursor-pointer rounded-tab px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none"
      :class="isSelectedItem(item) ? 'bg-wx-sky-100 ring-1 ring-black/5' : 'bg-white ring-0'"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>
