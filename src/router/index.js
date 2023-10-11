import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/PageLogin.vue')
    },
    {
      path: '/home',
      component: () => import('@/components/pages/PageHome.vue')
    },
    {
      path: '/edit/:id',
      component: () => import('@/components/pages/PageEditSheet.vue')
    }
  ]
});

export default router;
