<script setup lang="ts">
// TODO: accept array of forecast days via props.
</script>

<template>
  <div class="flex flex-col gap-4 overflow-visible pb-1 sm:flex-row sm:gap-6">
    <div
      class="flex w-full flex-shrink-0 flex-row items-center rounded-card-mobile bg-wx-sky-50 px-6 py-5-5 text-left shadow-sm ring-1 ring-black/5 sm:w-32 sm:flex-col sm:items-center sm:rounded-card sm:text-center sm:md:w-36"
    >
      <img src="/images/snow.svg" alt="Snowing" class="h-10 w-10" />
      <div class="ml-4 flex flex-col sm:ml-0">
        <div class="font-semibold sm:mt-4">Today</div>
        <div class="text-xs text-wx-gray-400">Frozen</div>
      </div>
      <div class="ml-auto text-xl font-semibold sm:mt-4 sm:ml-0">2 °C</div>
    </div>
    <div
      class="flex w-full flex-shrink-0 flex-row items-center rounded-card-mobile bg-wx-sky-100 px-6 py-5-5 text-left shadow-sm ring-1 ring-black/5 sm:w-32 sm:flex-col sm:items-center sm:rounded-card sm:text-center sm:md:w-36"
    >
      <img src="/images/snow.svg" alt="Snowing" class="h-10 w-10" />
      <div class="ml-4 flex flex-col sm:ml-0">
        <div class="font-semibold sm:mt-4">Tomorrow</div>
        <div class="text-xs text-wx-gray-400">Frozen</div>
      </div>
      <div class="ml-auto text-xl font-semibold sm:mt-4 sm:ml-0">3 °C</div>
    </div>
    <div
      class="flex w-full flex-shrink-0 flex-row items-center rounded-card-mobile bg-wx-aqua-100 px-6 py-5-5 text-left shadow-sm ring-1 ring-black/5 sm:w-32 sm:flex-col sm:items-center sm:rounded-card sm:text-center sm:md:w-36"
    >
      <img src="/images/partly-cloudy.svg" alt="Partly cloudy" class="h-10 w-10" />
      <div class="ml-4 flex flex-col sm:ml-0">
        <div class="font-semibold sm:mt-4">Wednesday</div>
        <div class="text-xs text-wx-gray-400">Partly Cloudy</div>
      </div>
      <div class="ml-auto text-xl font-semibold sm:mt-4 sm:ml-0">10 °C</div>
    </div>
    <div
      class="flex w-full flex-shrink-0 flex-row items-center rounded-card-mobile bg-wx-amber-100 px-6 py-5-5 text-left shadow-sm ring-1 ring-black/5 sm:w-32 sm:flex-col sm:items-center sm:rounded-card sm:text-center sm:md:w-36"
    >
      <img src="/images/partly-cloudy.svg" alt="Partly cloudy" class="h-10 w-10" />
      <div class="ml-4 flex flex-col sm:ml-0">
        <div class="font-semibold sm:mt-4">Thursday</div>
        <div class="text-xs text-wx-gray-400">Partly Cloudy</div>
      </div>
      <div class="ml-auto text-xl font-semibold sm:mt-4 sm:ml-0">15 °C</div>
    </div>
    <div
      class="flex w-full flex-shrink-0 flex-row items-center rounded-card-mobile bg-wx-pink-200 px-6 py-5-5 text-left shadow-sm ring-1 ring-black/5 sm:w-32 sm:flex-col sm:items-center sm:rounded-card sm:text-center sm:md:w-36"
    >
      <img src="/images/sunny.svg" alt="Sunny" class="h-10 w-10" />
      <div class="ml-4 flex flex-col sm:ml-0">
        <div class="font-semibold sm:mt-4">Friday</div>
        <div class="text-xs text-wx-gray-400">Sunny</div>
      </div>
      <div class="ml-auto text-xl font-semibold sm:mt-4 sm:ml-0">32 °C</div>
    </div>
  </div>
</template>
