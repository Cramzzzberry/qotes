import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/pages/PageLogin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/pages/PageSignup.vue')
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
  const userId = localStorage.getItem('user_id')
  const isAuthenticated = await checkAuthentication()

  if (to.meta.requiresAuth) {
    if (!isAuthenticated && to.path !== '/login') {
      return { name: 'login', replace: true }
    }
  } else {
    if (isAuthenticated) {
      return { name: 'home', params: { userId: userId }, replace: true }
    }
  }
})

async function checkAuthentication() {
  const userId = localStorage.getItem('user_id')
  const token = localStorage.getItem('token')

  const isAuthenticated = await fetch(`${import.meta.env.VITE_API_DOMAIN}/auth`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      userId: userId
    })
  })
    .then(async (res) => {
      if (res.status === 200) {
        return true
      } else if (res.status === 401) {
        return false
      }
    })
    .catch((err) => console.log(err))

  return isAuthenticated
}

export default router
