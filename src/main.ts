import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import App from './App.vue';

import queryClient from '@/queries/client';

const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });
app.mount('#app');
