<script setup lang="ts">
import { ref } from 'vue';

export interface CityTab {
  name: string;
  label: string;
}

const CITY_TABS: CityTab[] = [
  { name: 'Denver', label: 'Denver 🏔' },
  { name: 'Rio de Janeiro', label: 'Rio de Janeiro ⛱' },
  { name: 'Madrid', label: 'Madrid 💃' },
  { name: 'Japan', label: 'Japan 🍣' },
  { name: 'Australia', label: 'Australia 🐨' },
];

const emit = defineEmits<{
  change: [city: string];
}>();

const selected = ref<string>(CITY_TABS[0]?.name ?? '');

function onSelect(city: CityTab) {
  if (selected.value === city.name) {
    return;
  }

  selected.value = city.name;
  emit('change', city.name);
}
</script>

<template>
  <nav
    aria-label="Select city"
    role="tablist"
    class="-mx-4 flex gap-2 overflow-x-auto px-4 py-2 whitespace-nowrap sm:mx-0 sm:overflow-visible sm:px-0"
  >
    <button
      v-for="city in CITY_TABS"
      :key="city.name"
      role="tab"
      :aria-selected="selected === city.name"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      :class="selected === city.name ? 'bg-wx-sky-100 ring-1 ring-black/5' : 'ring-0'"
      @click="onSelect(city)"
    >
      {{ city.label }}
    </button>
  </nav>
</template>
