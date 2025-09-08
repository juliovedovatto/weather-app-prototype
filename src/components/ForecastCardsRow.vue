<script setup lang="ts">
import { computed } from 'vue';

import ForecastCard from './ForecastCard.vue';

import type { CurrentCondition } from '@/models/weather';

export interface ForecastCardsRowProps {
  conditions: CurrentCondition[];
  loading: boolean;
  days?: number; // optional override for skeleton count (defaults to 5)
}

const props = defineProps<ForecastCardsRowProps>();

const skeletonCount = computed(() => props.days ?? 5);
const showSkeleton = computed(() => props.loading || props.conditions.length === 0);

function labelForIndex(index: number) {
  if (index === 0) {
    return 'Today';
  }
  if (index === 1) {
    return 'Tomorrow';
  }

  const date = new Date();
  date.setDate(date.getDate() + index);

  return date.toLocaleDateString(undefined, { weekday: 'long' });
}
</script>

<template>
  <div class="flex flex-col gap-4 overflow-visible pb-1 sm:flex-row sm:gap-6">
    <!-- Skeleton cards -->
    <template v-if="showSkeleton">
      <ForecastCard v-for="n in skeletonCount" :key="`skeleton-${n}`" :label="'—'" :condition="null" loading />
    </template>

    <!-- Loaded forecast cards -->
    <template v-else>
      <ForecastCard
        v-for="(c, i) in conditions"
        :key="c.code + '-' + i"
        :label="labelForIndex(i)"
        :condition="c"
        :loading="false"
      />
    </template>
  </div>
</template>
