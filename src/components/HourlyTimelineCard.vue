<script setup lang="ts">
import { computed } from 'vue';

import type { HourlyWeatherCondition } from '@/models/weather';

import { getTemperatureColor } from '@/utils/temperatureColor';

export interface HourlyTimelineCardProps {
  condition: HourlyWeatherCondition;
}

const props = defineProps<HourlyTimelineCardProps>();

const label = computed(() => {
  const time = new Date(props.condition.time);

  if (time.getHours() === new Date().getHours()) {
    return 'Now';
  }

  return time.toLocaleTimeString(undefined, { hour: 'numeric', hour12: true });
});

const bgClass = computed(() => `bg-${getTemperatureColor(props.condition.temperature)}`);
</script>

<template>
  <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
    <div class="text-xl font-medium text-wx-gray-700">{{ label }}</div>
    <div class="flex h-24 w-24 items-center justify-center rounded-full" :class="[bgClass]">
      <img :src="condition.condition.icon" :alt="condition.condition.text" class="h-12 w-12" />
    </div>
    <div class="text-xl font-semibold">
      {{ condition.temperature != null ? Math.round(condition.temperature) + ' °C' : '--' }}
    </div>
  </div>
</template>
