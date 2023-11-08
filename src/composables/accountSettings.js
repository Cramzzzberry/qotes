import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/toast'

export const user = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

export function useAccountSettings() {
  const router = useRouter()
  const toast = useToast()

  async function updateAccount(userId, form) {
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

        toast.addToast({
          msg: 'Account updated successfully.',
          duration: 4000
        })
      })
      .catch((err) => console.log(err))
  }

  function logoutAccount() {
    localStorage.setItem('token', '')
    localStorage.setItem('user_id', '')

    toast.addToast({
      msg: 'Logged out successfully.',
      duration: 4000
    })

    router.push({ name: 'index' })
  }

  async function deleteAccount(userId) {
    await fetch(`http://localhost:3000/users/delete-account/${userId}`, {
      method: 'DELETE',
      mode: 'cors'
    })
      .then(() => {
        localStorage.setItem('token', '')
        localStorage.setItem('user_id', '')

        toast.addToast({
          msg: 'Account deleted successfully.',
          duration: 4000
        })

        router.push('/')
      })
      .catch((err) => console.log(err))
  }
  return { updateAccount, logoutAccount, deleteAccount }
}
