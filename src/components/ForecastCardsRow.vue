<script setup lang="ts">
import { computed } from 'vue';

import ForecastCard from './ForecastCard.vue';

import type { WeatherCondition } from '@/models/weather';

export interface ForecastCardsRowProps {
  conditions: WeatherCondition[]; // rename later if desired
  loading: boolean;
  days?: number;
}

const props = defineProps<ForecastCardsRowProps>();

const skeletonCount = computed(() => props.days ?? 5);
const showSkeleton = computed(() => props.loading || props.conditions.length === 0);

function labelForIndex(index: number) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const date = new Date();
  date.setDate(date.getDate() + index);
  return date.toLocaleDateString(undefined, { weekday: 'long' });
}
</script>

<template>
  <div class="flex flex-col gap-4 overflow-visible pb-1 sm:flex-row sm:gap-6">
    <template v-if="showSkeleton">
      <ForecastCard v-for="n in skeletonCount" :key="`skeleton-${n}`" :label="'—'" :weather="null" :loading="true" />
    </template>
    <template v-else>
      <ForecastCard
        v-for="(w, i) in conditions"
        :key="w.condition.code + '-' + i"
        :label="labelForIndex(i)"
        :weather="w"
        :loading="false"
      />
    </template>
  </div>
</template>
