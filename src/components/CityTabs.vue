<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';

import type { TabItem } from '@/models/app';

export interface CityTabsProps {
  items: TabItem[];
}

const props = defineProps<CityTabsProps>();
const emit = defineEmits<{ tabSelected: [city: string] }>();

const selectedItem = ref('');

watch(
  () => props.items,
  (value) => {
    if (!value.length) {
      selectedItem.value = '';
      return;
    }
    const selected = value.find((i) => i.selected);
    if (selected && selected.name !== selectedItem.value) {
      selectedItem.value = selected.name;
      emit('tabSelected', selectedItem.value);
    } else if (!value.some((i) => i.name === selectedItem.value)) {
      const first = value[0];
      if (first) {
        selectedItem.value = first.name;
        emit('tabSelected', selectedItem.value);
      }
    }
  },
);

function isSelectedItem(item: TabItem) {
  return item.name === selectedItem.value;
}

function onSelect(item: TabItem) {
  if (isSelectedItem(item)) {
    return;
  }
  selectedItem.value = item.name;
  emit('tabSelected', item.name);
}

onBeforeMount(() => {
  selectedItem.value = props.items.find((i) => i.selected)?.name ?? props.items[0]?.name ?? '';
});
</script>

<template>
  <nav
    data-test="city-tabs"
    aria-label="Select city"
    role="tablist"
    class="-mx-4 flex gap-2 overflow-x-auto px-4 py-2 whitespace-nowrap sm:mx-0 sm:overflow-visible sm:px-0"
  >
    <button
      v-for="item in props.items"
      :key="item.name"
      role="tab"
      :aria-selected="isSelectedItem(item)"
      class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      :class="isSelectedItem(item) ? 'bg-wx-sky-100 ring-1 ring-black/5' : 'ring-0'"
      @click="onSelect(item)"
    >
      {{ item.label }}
    </button>
  </nav>
</template>
