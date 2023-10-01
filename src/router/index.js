import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/components/pages/HomePage.vue'
import EditChordsPage from '@/components/pages/EditChordsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      component: HomePage
    },
    {
      path: '/edit/:id',
      component: EditChordsPage
    }
  ]
})

export default router
