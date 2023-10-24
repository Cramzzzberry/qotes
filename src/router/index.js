import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/pages/PageLogin.vue')
    },
    {
      path: '/home/:userId',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/components/pages/PageHome.vue')
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

router.beforeEach(async (to, from) => {
  const isLoggedIn = localStorage.getItem('loggedIn')
  const userId = localStorage.getItem('user_id')

  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuthentication()
    if (!isAuthenticated && to.path !== '/') {
      return { name: 'index' }
    }
  }

  // cancel/redirect user if they try to go to path '/'
  if (isLoggedIn === 'true' && to.path === '/' && from.path !== '/') {
    return false
  } else if (isLoggedIn === 'true' && to.path === '/') {
    return { path: `/home/${userId}` }
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
