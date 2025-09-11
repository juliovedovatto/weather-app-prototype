<script setup lang="ts">
import { computed, ref } from 'vue';

import UserName from '@/components/UserName.vue';

const userName = ref('');

const greeting = computed(() => {
  const hour = new Date().getHours();
  let message = 'Good night';
  let emoji = '🌙';
  switch (true) {
    case hour < 5:
      message = 'Good night';
      emoji = '🌙';
      break;
    case hour < 12:
      message = 'Good morning';
      emoji = '🌞';
      break;
    case hour < 17:
      message = 'Good afternoon';
      emoji = '🌤';
      break;
    case hour < 21:
      message = 'Good evening';
      emoji = '🌆';
      break;
    default:
      message = 'Good night';
      emoji = '🌙';
  }
  return { message, emoji };
});
</script>

<template>
  <main class="container flex flex-col gap-12 px-4 py-6 sm:py-14">
    <!-- Welcome headline -->
    <h1 class="text-xl leading-tight font-semibold sm:text-5xl">
      <span>{{ greeting.message }},</span>
      <UserName v-model:name="userName" />
      <span>{{ greeting.emoji }}</span>
    </h1>

    <RouterView />
  </main>
</template>
