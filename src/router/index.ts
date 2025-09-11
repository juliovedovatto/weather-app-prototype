import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Basic placeholder routes; expand with real views later.
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/App.vue'), // Temporary: replace with a dedicated Home view later
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
