<script setup lang="ts">
import { computed } from 'vue';

import type { CurrentCondition } from '@/models/weather';

export interface ForecastCardProps {
  label: string;
  condition: CurrentCondition | null;
  loading: boolean;
}

const props = defineProps<ForecastCardProps>();

const showSkeleton = computed(() => props.loading || !props.condition);
</script>

<template>
  <div
    class="flex w-full flex-shrink-0 flex-row items-center rounded-card-mobile bg-wx-sky-50 px-6 py-5-5 text-left shadow-sm ring-1 ring-black/5 sm:w-32 sm:flex-col sm:items-center sm:rounded-card sm:text-center sm:md:w-36"
    :class="showSkeleton ? 'animate-pulse' : ''"
  >
    <!-- Icon -->
    <template v-if="!showSkeleton && condition?.icon">
      <img
        :src="condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`"
        :alt="condition.text"
        class="h-10 w-10"
      />
    </template>
    <template v-else>
      <div class="h-10 w-10 rounded-full bg-wx-sky-100" />
    </template>

    <!-- Text -->
    <div class="ml-4 flex w-full flex-col items-start sm:ml-0 sm:items-center">
      <div class="font-semibold sm:mt-4">
        <template v-if="!showSkeleton">{{ label }}</template>
        <span v-else class="block h-4 w-16 rounded bg-wx-sky-100" />
      </div>
      <div class="mt-1 min-h-[16px] w-full text-left text-xs text-wx-gray-400 sm:mt-2 sm:min-h-[20px] sm:text-center">
        <template v-if="!showSkeleton && condition">{{ condition.text }}</template>
        <span v-else class="block h-3 w-20 rounded bg-wx-sky-100" />
      </div>
    </div>

    <!-- Temp Placeholder (future) -->
    <div v-if="!showSkeleton" class="ml-auto text-xl font-semibold sm:mt-4 sm:ml-0">—</div>
    <div v-else class="ml-auto h-5 w-10 rounded bg-wx-sky-100 sm:mt-4 sm:ml-0" />
  </div>
</template>
