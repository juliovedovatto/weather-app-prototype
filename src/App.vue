<script setup lang="ts">
import CityTabs from '@/components/CityTabs.vue';
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue';
import ForecastCardsRow from '@/components/ForecastCardsRow.vue';
import HourlyTimeline from '@/components/HourlyTimeline.vue';
</script>

<template>
  <main class="container flex flex-col gap-12 px-4 py-6 sm:py-14">
    <!-- Welcome headline -->
    <h1 class="text-xl leading-tight font-semibold sm:text-5xl">Good afternoon, Samantha 🌞</h1>

    <!-- City Tabs -->
    <CityTabs />

    <section class="flex flex-col gap-8 md:grid md:grid-cols-[260px_1fr] md:gap-x-7 md:gap-y-0">
      <!-- Current Weather Large Card -->
      <CurrentWeatherCard />

      <div class="flex h-full flex-col gap-8 sm:justify-between sm:gap-0">
        <!-- Hourly timeline -->
        <HourlyTimeline />

        <!-- Forecast Cards Row -->
        <ForecastCardsRow />
      </div>
    </section>
  </main>
</template>
