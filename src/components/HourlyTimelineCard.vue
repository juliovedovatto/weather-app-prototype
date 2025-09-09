<script setup lang="ts">
import { computed } from 'vue';

import type { HourlyWeatherCondition, WeatherLocation } from '@/models/weather';

import { toZoned, formatHour } from '@/utils/date';
import { getTemperatureColor } from '@/utils/temperatureColor';

export interface HourlyTimelineCardProps {
  condition?: HourlyWeatherCondition | null;
  location: WeatherLocation | null;
  loading?: boolean;
}

const props = defineProps<HourlyTimelineCardProps>();

const showSkeleton = computed(() => props.loading || !props.condition || !props.location);
const nowDate = computed(() => (props.location ? toZoned(new Date(), props.location.tz_id) : null));

const hour = computed(() => {
  if (showSkeleton.value || !props.condition || !props.location || !nowDate.value) {
    return '';
  }

  const date = new Date(props.condition.time);
  if (date.getHours() === nowDate.value.getHours()) {
    return 'Now';
  }

  return formatHour(date);
});

const bgClass = computed(() =>
  showSkeleton.value || !props.condition ? 'bg-wx-gray-200' : `bg-${getTemperatureColor(props.condition.temperature)}`,
);
</script>

<template>
  <div
    class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36"
    :class="[showSkeleton ? 'animate-pulse' : '']"
  >
    <div class="text-xl font-medium text-wx-gray-700">
      <span v-if="!showSkeleton">{{ hour }}</span>
      <span v-else class="block h-5 w-12 rounded bg-wx-gray-300" />
    </div>
    <div class="flex h-24 w-24 items-center justify-center rounded-full" :class="[bgClass]">
      <template v-if="!showSkeleton && condition">
        <img :src="condition.condition.icon" :alt="condition.condition.text" class="h-12 w-12" />
      </template>
    </div>
    <div class="text-xl font-semibold">
      <span v-if="!showSkeleton && condition">
        {{ condition.temperature != null ? Math.round(condition.temperature) + ' °C' : '--' }}
      </span>
      <span v-else class="block h-6 w-10 rounded bg-wx-gray-300" />
    </div>
  </div>
</template>
