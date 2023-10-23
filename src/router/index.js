import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/PageLogin.vue')
    },
    {
      path: '/home/:userId',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/components/pages/PageHome.vue')
    },
    {
      path: '/edit/:id',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/components/pages/PageEditSheet.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = await checkAuthentication()
    if (!isAuthenticated && to.path !== '/') {
      return { path: '/' }
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
