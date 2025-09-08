<script setup lang="ts">
// TODO: props for time, condition label, temperature, icon, bg class
</script>

<template>
  <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
    <div class="text-xl font-medium text-wx-gray-700">Now</div>
    <div class="flex h-24 w-24 items-center justify-center rounded-full bg-wx-sky-50">
      <img src="/images/snow.svg" alt="Snowing" class="h-12 w-12" />
    </div>
    <div class="text-xl font-semibold">2 °C</div>
  </div>
</template>
