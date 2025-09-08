<script setup lang="ts">
import { computed } from 'vue';

import type { WeatherLocation } from '@/models/weather';

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeatherCardProps {
  location: WeatherLocation | null;
  condition: WeatherCondition | null;
  loading: boolean;
  temperatureC: number | null; // currentLocationTemperature from parent
}

const props = defineProps<CurrentWeatherCardProps>();

const showSkeleton = computed(() => props.loading || !props.location || !props.condition || props.temperatureC == null);
</script>

<template>
  <div
    class="flex w-full flex-row items-center rounded-hero-mobile bg-wx-sky-50 p-4 shadow-sm ring-1 ring-black/5 sm:flex-col sm:items-center sm:rounded-hero sm:px-10 sm:pt-10 sm:pb-8 md:w-[260px]"
    :class="showSkeleton ? 'animate-pulse' : ''"
  >
    <!-- Icon / Avatar -->
    <div
      class="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-wx-sky-100 sm:h-32 sm:w-32"
    >
      <template v-if="!showSkeleton && condition?.icon">
        <img
          :src="condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`"
          :alt="condition.text"
          class="h-9 w-9 sm:h-16 sm:w-16"
        />
      </template>
      <template v-else>
        <div class="h-9 w-9 rounded-full bg-wx-sky-100 sm:h-16 sm:w-16" />
      </template>
    </div>

    <!-- Textual Info -->
    <div class="ml-6 flex w-[140px] flex-col sm:mt-10 sm:ml-0 sm:w-full">
      <h2 class="truncate text-xl leading-none font-semibold sm:text-[32px]">
        <template v-if="!showSkeleton && location">{{ location.name }}</template>
        <span v-else class="block h-5 w-24 rounded bg-wx-sky-100 sm:h-8 sm:w-40" />
      </h2>
      <div class="mt-1 min-h-[16px] text-xs font-medium text-wx-gray-400 sm:mt-2 sm:min-h-[20px]">
        <template v-if="!showSkeleton && condition">{{ condition.text }}</template>
        <span v-else class="block h-3 w-16 rounded bg-wx-sky-100 sm:h-4 sm:w-28" />
      </div>
    </div>

    <!-- Temperature Placeholder (data not yet wired) -->
    <div class="ml-auto flex items-start gap-1 leading-none sm:mt-10 sm:ml-0">
      <template v-if="!showSkeleton">
        <span class="text-[52px] font-semibold tracking-tight sm:text-[140px]" style="line-height: 0.85">{{
          Math.round(temperatureC!)
        }}</span>
        <span class="mt-2 text-[20px] font-semibold sm:mt-3 sm:text-4xl">°C</span>
      </template>
      <template v-else>
        <span class="block h-[52px] w-14 rounded bg-wx-sky-100 sm:h-[140px] sm:w-24" />
      </template>
    </div>
  </div>
</template>
