import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import App from './App.vue';

import queryClient from '@/queries/client';
import router from '@/router';

const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.mount('#app');
