<script setup lang="ts">
import { computed } from 'vue';

import type { WeatherLocation, WeatherCondition } from '@/models/weather';

import { getTemperatureColor } from '@/utils/temperatureColor';

export interface CurrentWeatherCardProps {
  location: WeatherLocation | null;
  condition: WeatherCondition | null; // renamed from weather
  loading: boolean;
}

const props = defineProps<CurrentWeatherCardProps>();

const showSkeleton = computed(
  () => props.loading || !props.location || !props.condition || props.condition.temperature == null,
);

const temperatureDisplay = computed(() => {
  const t = props.condition?.temperature;
  return typeof t === 'number' ? Math.round(t) : null;
});

const bgClass = computed(
  () => `bg-${showSkeleton.value ? 'wx-gray-200' : getTemperatureColor(props.condition?.temperature)}`,
);
</script>

<template>
  <div
    class="flex w-full flex-row items-center rounded-hero-mobile p-4 shadow-sm ring-1 ring-black/5 sm:flex-col sm:items-center sm:rounded-hero sm:px-10 sm:pt-10 sm:pb-8 md:w-[260px]"
    :class="[bgClass, showSkeleton ? 'animate-pulse' : '']"
  >
    <!-- Icon / Avatar -->
    <div
      class="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full brightness-95 contrast-105 sm:h-32 sm:w-32"
      :class="bgClass"
    >
      <template v-if="!showSkeleton && condition?.condition.icon">
        <img :src="condition.condition.icon" :alt="condition.condition.text" class="h-9 w-9 sm:h-16 sm:w-16" />
      </template>
    </div>

    <!-- Textual Info -->
    <div class="ml-6 flex w-[140px] flex-col sm:mt-10 sm:ml-0 sm:w-full">
      <h2 class="truncate text-xl leading-none font-semibold sm:text-[32px]">
        <template v-if="!showSkeleton && location">{{ location.name }}</template>
        <span v-else class="block h-5 w-24 rounded bg-wx-gray-300 sm:h-8 sm:w-40" />
      </h2>
      <div class="mt-1 min-h-[16px] text-xs font-medium text-wx-gray-700 sm:mt-2 sm:min-h-[20px]">
        <template v-if="!showSkeleton && condition">{{ condition.condition.text }}</template>
        <span v-else class="block h-3 w-16 rounded bg-wx-gray-300 sm:h-4 sm:w-28" />
      </div>
    </div>

    <!-- Temperature -->
    <div class="ml-auto flex items-start gap-1 leading-none sm:mt-10 sm:ml-0">
      <template v-if="!showSkeleton">
        <span class="text-[52px] font-semibold tracking-tight sm:text-[140px]" style="line-height: 0.85">{{
          temperatureDisplay ?? '—'
        }}</span>
        <span class="mt-2 text-[20px] font-semibold sm:mt-3 sm:text-4xl">°C</span>
      </template>
      <template v-else>
        <span class="block h-[52px] w-14 rounded bg-wx-gray-300 sm:h-[140px] sm:w-24" />
      </template>
    </div>
  </div>
</template>
