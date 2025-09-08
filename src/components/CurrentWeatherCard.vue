<script setup lang="ts">
// Static for now – will be replaced with props once data binding is added.
</script>

<template>
  <div
    class="flex w-full flex-row items-center rounded-hero-mobile bg-wx-sky-50 p-4 shadow-sm ring-1 ring-black/5 sm:flex-col sm:items-center sm:rounded-hero sm:px-10 sm:pt-10 sm:pb-8 md:w-[260px]"
  >
    <div class="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-wx-sky-100 sm:h-32 sm:w-32">
      <img src="/images/snow.svg" alt="Snowing" class="h-9 w-9 sm:h-16 sm:w-16" />
    </div>
    <div class="ml-6 flex flex-col sm:mt-10 sm:ml-0">
      <h2 class="text-xl leading-none font-semibold sm:text-[32px]">Denver</h2>
      <div class="mt-1 text-xs font-medium text-wx-gray-400 sm:mt-2">Snowing</div>
    </div>
    <div class="ml-auto flex items-start gap-1 leading-none sm:mt-10 sm:ml-0">
      <span class="text-[52px] font-semibold tracking-tight sm:text-[140px]" style="line-height: 0.85">2</span>
      <span class="mt-2 text-[20px] font-semibold sm:mt-3 sm:text-4xl">°C</span>
    </div>
  </div>
</template>
