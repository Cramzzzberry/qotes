import { reactive, toValue } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'

export function useLogin(loginForm) {
  const router = useRouter()

  const loginError = reactive({
    accExistence: false,
    password: false
  })

  const login = () => {
    const onLogin = async () => {
      const formdata = new FormData(toValue(loginForm))
      const logAccObj = {}

      formdata.forEach((value, key) => {
        logAccObj[key] = value
      })

      await fetch(`${import.meta.env.VITE_API_DOMAIN}/users/login-account`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logAccObj)
      })
        .then(async (res) => {
          if (res.status === 200) {
            const response = await res.json()

            localStorage.setItem('token', response.token)
            localStorage.setItem('user_id', response.userId)

            loginError.accExistence = false
            loginError.password = false

            toastStore.add({
              msg: 'Logged in successfully.',
              duration: 4000
            })

            router.push({ name: 'home', params: { userId: response.userId } })
          } else if (res.status === 401) {
            loginError.accExistence = false
            loginError.password = true
          } else if (res.status === 400) {
            loginError.accExistence = true
          }
        })
        .catch((err) => {
          console.log(err)

          toastStore.add({
            msg: err,
            duration: 4000
          })
        })
    }

    onLogin()
  }

  return { login, loginError }
}
