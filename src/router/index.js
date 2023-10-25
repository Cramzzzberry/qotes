import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/pages/PageLogin.vue'),
      beforeEnter: async () => {
        const userId = localStorage.getItem('user_id')

        //i put beforeEnter here to prevent infinite redirection in beforeEach
        const isAuthenticated = await checkAuthentication()
        if (isAuthenticated) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }
      }
    },
    {
      path: '/home/:userId',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/components/pages/PageHome.vue'),
      beforeEnter: async (to) => {
        const userId = localStorage.getItem('user_id')

        if (to.params.userId !== userId) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/components/pages/PageEditSheet.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuthentication()
    if (!isAuthenticated && to.path !== '/') {
      return { name: 'index', replace: true }
    }
  }
})

async function checkAuthentication() {
  const isAuthenticated = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    })
  })
    .then(async (res) => {
      const response = await res.json()
      return response.authenticated
    })
    .catch((err) => console.log(err))

  return isAuthenticated
}

export default router
