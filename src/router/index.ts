import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Basic placeholder routes; expand with real views later.
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
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
