import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/LoginPage.vue')
    },
    {
      path: '/home',
      component: () => import('@/components/pages/HomePage.vue')
    },
    {
      path: '/edit/:id',
      component: () => import('@/components/pages/EditChordsPage.vue')
    }
  ]
});

export default router;
