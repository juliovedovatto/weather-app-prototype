<script setup lang="ts">
// TODO: make dynamic via props (hours data array)
import HourlyTimelineCard from '@/components/HourlyTimelineCard.vue';
</script>

<template>
  <div class="-mx-4 flex gap-6 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 md:overflow-visible md:pt-6">
    <HourlyTimelineCard />
    <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
      <div class="text-xl font-medium text-wx-gray-400">2 PM</div>
      <div class="flex h-24 w-24 items-center justify-center rounded-full bg-wx-sky-100">
        <img src="/images/snow.svg" alt="Snowing" class="h-12 w-12" />
      </div>
      <div class="text-xl font-semibold">4 °C</div>
    </div>
    <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
      <div class="text-xl font-medium text-wx-gray-400">3 PM</div>
      <div class="flex h-24 w-24 items-center justify-center rounded-full bg-wx-aqua-100">
        <img src="/images/cloudy.svg" alt="Cloudy" class="h-12 w-12" />
      </div>
      <div class="text-xl font-semibold">8 °C</div>
    </div>
    <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
      <div class="text-xl font-medium text-wx-gray-400">4 PM</div>
      <div class="flex h-24 w-24 items-center justify-center rounded-full bg-wx-aqua-100">
        <img src="/images/cloudy.svg" alt="Cloudy" class="h-12 w-12" />
      </div>
      <div class="text-xl font-semibold">10 °C</div>
    </div>
    <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
      <div class="text-xl font-medium text-wx-gray-400">5 PM</div>
      <div class="flex h-24 w-24 items-center justify-center rounded-full bg-wx-amber-100">
        <img src="/images/partly-cloudy.svg" alt="Partly cloudy" class="h-12 w-12" />
      </div>
      <div class="text-xl font-semibold">15 °C</div>
    </div>
  </div>
</template>
