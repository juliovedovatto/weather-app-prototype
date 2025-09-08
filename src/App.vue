<script setup lang="ts">
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue';
</script>

<template>
  <main class="container flex flex-col gap-12 px-4 py-6 sm:py-14">
    <!-- Welcome headline -->
    <h1 class="text-xl leading-tight font-semibold sm:text-5xl">Good afternoon, Samantha 🌞</h1>

    <!-- City Tabs -->
    <nav
      aria-label="Select city"
      role="tablist"
      class="-mx-4 flex gap-2 overflow-x-auto px-4 py-2 whitespace-nowrap sm:mx-0 sm:overflow-visible sm:px-0"
    >
      <button
        role="tab"
        aria-selected="true"
        class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 ring-1 ring-black/5 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      >
        Denver 🏔
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      >
        Rio de Janeiro ⛱
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      >
        Madrid 💃
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      >
        Japan 🍣
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="cursor-pointer rounded-tab bg-white px-6 py-2 text-[18px] leading-tight font-semibold text-wx-navy-900 transition-colors hover:bg-wx-sky-100 focus:ring-2 focus:ring-wx-sky-50 focus:outline-none aria-selected:bg-wx-sky-100"
      >
        Australia 🐨
      </button>
    </nav>

    <section class="flex flex-col gap-8 md:grid md:grid-cols-[260px_1fr] md:gap-x-7 md:gap-y-0">
      <!-- Current Weather Large Card -->
      <CurrentWeatherCard />

      <div class="flex h-full flex-col gap-8 sm:justify-between sm:gap-0">
        <!-- Hourly timeline -->
        <div class="-mx-4 flex gap-6 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 md:overflow-visible md:pt-6">
          <div class="flex w-32 flex-shrink-0 flex-col items-center gap-4 md:w-36">
            <div class="text-xl font-medium text-wx-gray-400">Now</div>
            <div class="flex h-24 w-24 items-center justify-center rounded-full bg-wx-sky-50">
              <img src="/images/snow.svg" alt="Snowing" class="h-12 w-12" />
            </div>
            <div class="text-xl font-semibold">2 °C</div>
          </div>
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

        <!-- Forecast Cards Row -->
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
      </div>
    </section>
  </main>
</template>
