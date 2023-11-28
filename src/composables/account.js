import { toValue } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toastStore } from '@/store'
import { profileStore } from '@/store'

export function useAccount(accountForm) {
  const route = useRoute()
  const router = useRouter()
  const userId = route.params.userId

  // getting user data
  const getProfile = () => {
    const onFetch = async () => {
      await fetch(`${import.meta.env.VITE_API_DOMAIN}/users/get-user/${userId}`)
        .then(async (res) => {
          const profile = await res.json()

          profileStore.firstName = profile.first_name
          profileStore.lastName = profile.last_name
          profileStore.email = profile.email
        })
        .catch((err) => {
          console.log(err)
        })
    }
    onFetch()
  }

  const update = () => {
    const formdata = new FormData(toValue(accountForm))
    const userDetails = {}

    formdata.forEach((value, key) => {
      userDetails[key] = value
    })

    const onUpdate = async () => {
      await fetch(`${import.meta.env.VITE_API_DOMAIN}/users/update-account/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      })
        .then(() => {
          profileStore.firstName = formdata.get('first_name')
          profileStore.lastName = formdata.get('last_name')
          profileStore.email = formdata.get('email')

          toastStore.add({
            msg: 'Account updated successfully.',
            duration: 4000
          })
        })
        .catch((err) => console.log(err))
    }

    onUpdate()
  }

  const logout = () => {
    const onLogout = async () => {
      await fetch(`${import.meta.env.VITE_API_DOMAIN}/users/logout-account`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          localStorage.setItem('token', '')
          localStorage.setItem('user_id', '')

          profileStore.toggleModal()
          router.push({ name: 'login' })

          toastStore.add({
            msg: 'Logged out successfully.',
            duration: 4000
          })
        })
        .catch((err) => console.log(err))
    }

    onLogout()
  }

  const eraseAcc = () => {
    const onErase = async () => {
      await fetch(`${import.meta.env.VITE_API_DOMAIN}/users/delete-account/${userId}`, {
        method: 'DELETE',
        mode: 'cors'
      })
        .then(() => {
          localStorage.setItem('token', '')
          localStorage.setItem('user_id', '')

          profileStore.toggleModal()
          profileStore.toggleDeleteDialog()

          toastStore.add({
            msg: 'Account deleted successfully.',
            duration: 4000
          })

          router.push({ name: 'login' })
        })
        .catch((err) => console.log(err))
    }

    onErase()
  }

  return { update, logout, eraseAcc, getProfile }
}
