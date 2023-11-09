import { useRouter } from 'vue-router'
import { toasts } from '@/composables/toast'

export function useAccountSettings() {
  const router = useRouter()

  async function update(userId, form) {
    const user = {
      firstName: '',
      lastName: '',
      email: ''
    }
    const formdata = new FormData(form)
    const userDetails = {}

    formdata.forEach((value, key) => {
      userDetails[key] = value
    })

    await fetch(`http://localhost:3000/users/update-account/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then(() => {
        user.firstName = userDetails.first_name
        user.lastName = userDetails.last_name
        user.email = userDetails.email

        toasts.add({
          msg: 'Account updated successfully.',
          duration: 4000
        })
      })
      .catch((err) => console.log(err))

    return user
  }

  function logout() {
    localStorage.setItem('token', '')
    localStorage.setItem('user_id', '')

    toasts.add({
      msg: 'Logged out successfully.',
      duration: 4000
    })

    router.push({ name: 'index' })
  }

  async function erase(userId) {
    await fetch(`http://localhost:3000/users/delete-account/${userId}`, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(() => {
        localStorage.setItem('token', '')
        localStorage.setItem('user_id', '')

        toasts.add({
          msg: 'Account deleted successfully.',
          duration: 4000
        })

        router.push('/')
      })
      .catch((err) => console.log(err))
  }

  return { update, logout, erase }
}
