import { createRouter, createWebHistory } from 'vue-router';
import EntryView from '../views/EntryView.vue';
import HomeView from '../views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import EditView from '../views/EditView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'entry',
      component: EntryView,
      beforeEnter: () => {
        if (localStorage.getItem('qotes_token')) {
          return { name: 'home' };
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
});

export default router;
