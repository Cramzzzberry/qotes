import { toValue } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toasts } from '@/composables/toast'
import { profileStore } from '@/store'

export function useAccount(accountForm) {
  const route = useRoute()
  const router = useRouter()
  const userId = route.params.userId

  // getting user data
  const getProfile = () => {
    const onFetch = async () => {
      await fetch(`http://localhost:3000/users/get-user/${userId}`)
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
      await fetch(`http://localhost:3000/users/update-account/${userId}`, {
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

          toasts.add({
            msg: 'Account updated successfully.',
            duration: 4000
          })
        })
        .catch((err) => console.log(err))
    }

    onUpdate()
  }

  const logout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('user_id', '')

    profileStore.toggleModal()
    router.push({ name: 'index' })

    toasts.add({
      msg: 'Logged out successfully.',
      duration: 4000
    })
  }

  const eraseAcc = () => {
    const onErase = async () => {
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

    onErase()
  }

  return { update, logout, eraseAcc, getProfile }
}
