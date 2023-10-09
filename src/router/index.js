import { createRouter, createWebHistory } from 'vue-router';
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/LoginPage.vue')
    },
    {
      path: '/home',
      children: [
        {
          path: '',
          redirect: '/home/all-sheets'
        },
        {
          path: 'all-sheets',
          meta: { layout: SidebarLayout },
          component: () => import('@/components/pages/AllSheetsPage.vue')
        },
        {
          path: 'pinned',
          meta: { layout: SidebarLayout },
          component: () => import('@/components/pages/PinnedSheetsPage.vue')
        },
        {
          path: 'important',
          meta: { layout: SidebarLayout },
          component: () => import('@/components/pages/ImportantSheetsPage.vue')
        }
      ]
    },
    {
      path: '/edit/:id',
      component: () => import('@/components/pages/EditChordsPage.vue')
    }
  ]
});

export default router;
