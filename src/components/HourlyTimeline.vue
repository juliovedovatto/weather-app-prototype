<script setup lang="ts">
import { fromUnixTime, startOfHour } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { computed } from 'vue';

import type { ForecastHour, HourlyWeatherCondition, WeatherLocation } from '@/models/weather';

import HourlyTimelineCard from '@/components/HourlyTimelineCard.vue';

export interface HourlyTimelineProps {
  conditions: ForecastHour[];
  location?: WeatherLocation | null;
  loading?: boolean;
  count?: number; // number of cards to display
}

const props = withDefaults(defineProps<HourlyTimelineProps>(), {
  location: null,
  loading: false,
  count: 5,
});

const showSkeleton = computed(() => props.loading || !props.location || !props.conditions.length);
const locationTz = computed(() => props.location?.tz_id || '');
const nowDate = computed(() => toZonedTime(new Date(), locationTz.value));

const hourlyConditions = computed<HourlyWeatherCondition[]>(() => {
  if (showSkeleton.value) {
    return [];
  }

  const nowEpoch = Math.floor(nowDate.value.getTime() / 1000);
  const date = fromUnixTime(nowEpoch);
  const nowHour = startOfHour(date);

  const filteredTime = props.conditions.filter((h) => {
    const time = toZonedTime(fromUnixTime(h.time_epoch), locationTz.value);
    return time >= nowHour;
  });

  return filteredTime.slice(0, props.count).map((h) => ({
    timeEpoch: h.time_epoch,
    time: h.time,
    condition: h.condition,
    temperature: h.temp_c,
  }));
});

const displayItems = computed<(HourlyWeatherCondition | null)[]>(() => {
  if (showSkeleton.value) {
    return Array.from({ length: props.count }, () => null);
  }

  return hourlyConditions.value;
});
</script>

<template>
  <div class="-mx-4 flex gap-6 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 md:overflow-visible md:pt-6">
    <template v-for="(condition, idx) in displayItems" :key="condition ? condition.timeEpoch : idx">
      <HourlyTimelineCard :condition="condition" :location="props.location" :loading="props.loading" />
    </template>
  </div>
</template>
