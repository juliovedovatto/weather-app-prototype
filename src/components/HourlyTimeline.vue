<script setup lang="ts">
import type { HourlyWeatherCondition } from '@/models/weather';

import HourlyTimelineCard from '@/components/HourlyTimelineCard.vue';

const props = defineProps<{ conditions: HourlyWeatherCondition[] }>();
</script>

<template>
  <div class="-mx-4 flex gap-6 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 md:overflow-visible md:pt-6">
    <template v-for="condition in props.conditions" :key="condition.timeEpoch">
      <HourlyTimelineCard :condition="condition" />
    </template>
  </div>
</template>
