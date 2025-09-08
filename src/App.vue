<script setup lang="ts"></script>

<template>
  <main class="container px-4 py-6 sm:py-14 flex flex-col gap-12">
    <!-- Welcome headline -->
    <h1 class="welcome-heading font-semibold text-xl sm:text-5xl leading-tight">Good afternoon, Samantha 🌞</h1>

    <!-- City Tabs -->
    <nav
      aria-label="Select city"
      role="tablist"
      class="flex gap-2 overflow-x-auto sm:overflow-visible whitespace-nowrap py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <button
        role="tab"
        aria-selected="true"
        class="px-6 py-2 cursor-pointer rounded-tab bg-white aria-selected:bg-wx-sky-100 hover:bg-wx-sky-100 font-semibold text-[18px] leading-tight text-wx-navy-900 focus:outline-none focus:ring-2 focus:ring-wx-sky-50 ring-1 ring-black/5 transition-colors"
      >
        Denver 🏔
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="px-6 py-2 cursor-pointer rounded-tab bg-white aria-selected:bg-wx-sky-100 hover:bg-wx-sky-100 font-semibold text-[18px] leading-tight text-wx-navy-900 focus:outline-none focus:ring-2 focus:ring-wx-sky-50 transition-colors"
      >
        Rio de Janeiro ⛱
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="px-6 py-2 cursor-pointer rounded-tab bg-white aria-selected:bg-wx-sky-100 hover:bg-wx-sky-100 font-semibold text-[18px] leading-tight text-wx-navy-900 focus:outline-none focus:ring-2 focus:ring-wx-sky-50 transition-colors"
      >
        Madrid 💃
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="px-6 py-2 cursor-pointer rounded-tab bg-white aria-selected:bg-wx-sky-100 hover:bg-wx-sky-100 font-semibold text-[18px] leading-tight text-wx-navy-900 focus:outline-none focus:ring-2 focus:ring-wx-sky-50 transition-colors"
      >
        Japan 🍣
      </button>
      <button
        role="tab"
        aria-selected="false"
        class="px-6 py-2 cursor-pointer rounded-tab bg-white aria-selected:bg-wx-sky-100 hover:bg-wx-sky-100 font-semibold text-[18px] leading-tight text-wx-navy-900 focus:outline-none focus:ring-2 focus:ring-wx-sky-50 transition-colors"
      >
        Australia 🐨
      </button>
    </nav>

    <section class="flex flex-col gap-8 md:grid md:grid-cols-[260px_1fr] md:gap-x-7 md:gap-y-0">
      <!-- Current Weather Large Card -->
      <div
        class="flex flex-row sm:flex-col rounded-hero-mobile sm:rounded-hero bg-wx-sky-50 p-4 sm:px-10 sm:pt-10 sm:pb-8 w-full md:w-[260px] items-center sm:items-center shadow-sm ring-1 ring-black/5"
      >
        <div class="w-[60px] h-[60px] sm:w-32 sm:h-32 rounded-full bg-wx-sky-100 flex items-center justify-center">
          <img src="/images/snow.svg" alt="Snowing" class="w-9 h-9 sm:w-16 sm:h-16" />
        </div>
        <div class="flex flex-col ml-6 sm:ml-0 sm:mt-10">
          <h2 class="text-xl sm:text-[32px] leading-none font-semibold">Denver</h2>
          <div class="mt-1 sm:mt-2 text-xs text-wx-gray-400 font-medium">Snowing</div>
        </div>
        <div class="ml-auto sm:ml-0 flex items-start gap-1 leading-none sm:mt-10">
          <span class="text-[52px] sm:text-[140px] font-semibold tracking-tight" style="line-height: 0.85">2</span>
          <span class="text-[20px] sm:text-4xl font-semibold mt-2 sm:mt-3">°C</span>
        </div>
      </div>

      <div class="flex flex-col gap-8 sm:justify-between sm:gap-0 h-full">
        <!-- Hourly timeline -->
        <div class="flex gap-6 md:pt-6 overflow-x-auto md:overflow-visible pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div class="w-32 md:w-36 flex-shrink-0 flex flex-col items-center gap-4">
            <div class="text-xl font-medium text-wx-gray-400">Now</div>
            <div class="w-24 h-24 rounded-full bg-wx-sky-50 flex items-center justify-center">
              <img src="/images/snow.svg" alt="Snowing" class="w-12 h-12" />
            </div>
            <div class="text-xl font-semibold">2 °C</div>
          </div>
          <div class="w-32 md:w-36 flex-shrink-0 flex flex-col items-center gap-4">
            <div class="text-xl font-medium text-wx-gray-400">2 PM</div>
            <div class="w-24 h-24 rounded-full bg-wx-sky-100 flex items-center justify-center">
              <img src="/images/snow.svg" alt="Snowing" class="w-12 h-12" />
            </div>
            <div class="text-xl font-semibold">4 °C</div>
          </div>
          <div class="w-32 md:w-36 flex-shrink-0 flex flex-col items-center gap-4">
            <div class="text-xl font-medium text-wx-gray-400">3 PM</div>
            <div class="w-24 h-24 rounded-full bg-wx-aqua-100 flex items-center justify-center">
              <img src="/images/cloudy.svg" alt="Cloudy" class="w-12 h-12" />
            </div>
            <div class="text-xl font-semibold">8 °C</div>
          </div>
          <div class="w-32 md:w-36 flex-shrink-0 flex flex-col items-center gap-4">
            <div class="text-xl font-medium text-wx-gray-400">4 PM</div>
            <div class="w-24 h-24 rounded-full bg-wx-aqua-100 flex items-center justify-center">
              <img src="/images/cloudy.svg" alt="Cloudy" class="w-12 h-12" />
            </div>
            <div class="text-xl font-semibold">10 °C</div>
          </div>
          <div class="w-32 md:w-36 flex-shrink-0 flex flex-col items-center gap-4">
            <div class="text-xl font-medium text-wx-gray-400">5 PM</div>
            <div class="w-24 h-24 rounded-full bg-wx-amber-100 flex items-center justify-center">
              <img src="/images/partly-cloudy.svg" alt="Partly cloudy" class="w-12 h-12" />
            </div>
            <div class="text-xl font-semibold">15 °C</div>
          </div>
        </div>

        <!-- Forecast Cards Row -->
        <div class="flex flex-col gap-4 sm:flex-row sm:gap-6 overflow-visible pb-1">
          <div
            class="w-full sm:w-32 sm:md:w-36 flex-shrink-0 rounded-card-mobile sm:rounded-card px-6 py-5-5 bg-wx-sky-50 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center shadow-sm ring-1 ring-black/5"
          >
            <img src="/images/snow.svg" alt="Snowing" class="w-10 h-10" />
            <div class="ml-4 sm:ml-0 flex flex-col">
              <div class="font-semibold sm:mt-4">Today</div>
              <div class="text-xs text-wx-gray-400">Frozen</div>
            </div>
            <div class="ml-auto sm:ml-0 text-xl font-semibold sm:mt-4">2 °C</div>
          </div>
          <div
            class="w-full sm:w-32 sm:md:w-36 flex-shrink-0 rounded-card-mobile sm:rounded-card px-6 py-5-5 bg-wx-sky-100 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center shadow-sm ring-1 ring-black/5"
          >
            <img src="/images/snow.svg" alt="Snowing" class="w-10 h-10" />
            <div class="ml-4 sm:ml-0 flex flex-col">
              <div class="font-semibold sm:mt-4">Tomorrow</div>
              <div class="text-xs text-wx-gray-400">Frozen</div>
            </div>
            <div class="ml-auto sm:ml-0 text-xl font-semibold sm:mt-4">3 °C</div>
          </div>
          <div
            class="w-full sm:w-32 sm:md:w-36 flex-shrink-0 rounded-card-mobile sm:rounded-card px-6 py-5-5 bg-wx-aqua-100 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center shadow-sm ring-1 ring-black/5"
          >
            <img src="/images/partly-cloudy.svg" alt="Partly cloudy" class="w-10 h-10" />
            <div class="ml-4 sm:ml-0 flex flex-col">
              <div class="font-semibold sm:mt-4">Wednesday</div>
              <div class="text-xs text-wx-gray-400">Partly Cloudy</div>
            </div>
            <div class="ml-auto sm:ml-0 text-xl font-semibold sm:mt-4">10 °C</div>
          </div>
          <div
            class="w-full sm:w-32 sm:md:w-36 flex-shrink-0 rounded-card-mobile sm:rounded-card px-6 py-5-5 bg-wx-amber-100 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center shadow-sm ring-1 ring-black/5"
          >
            <img src="/images/partly-cloudy.svg" alt="Partly cloudy" class="w-10 h-10" />
            <div class="ml-4 sm:ml-0 flex flex-col">
              <div class="font-semibold sm:mt-4">Thursday</div>
              <div class="text-xs text-wx-gray-400">Partly Cloudy</div>
            </div>
            <div class="ml-auto sm:ml-0 text-xl font-semibold sm:mt-4">15 °C</div>
          </div>
          <div
            class="w-full sm:w-32 sm:md:w-36 flex-shrink-0 rounded-card-mobile sm:rounded-card px-6 py-5-5 bg-wx-pink-200 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center shadow-sm ring-1 ring-black/5"
          >
            <img src="/images/sunny.svg" alt="Sunny" class="w-10 h-10" />
            <div class="ml-4 sm:ml-0 flex flex-col">
              <div class="font-semibold sm:mt-4">Friday</div>
              <div class="text-xs text-wx-gray-400">Sunny</div>
            </div>
            <div class="ml-auto sm:ml-0 text-xl font-semibold sm:mt-4">32 °C</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
