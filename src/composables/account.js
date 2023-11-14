import { ref, toValue, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toasts } from '@/composables/toast'

export function useAccount(accountForm) {
  const route = useRoute()
  const router = useRouter()
  const userEmail = ref('')
  const userFirstName = ref('')
  const userLastName = ref('')
  const userId = route.params.userId

  // getting user data
  onMounted(async () => {
    await fetch(`http://localhost:3000/users/get-user/${userId}`)
      .then(async (res) => {
        const profile = await res.json()

        userFirstName.value = profile.first_name
        userLastName.value = profile.last_name
        userEmail.value = profile.email
      })
      .catch((err) => {
        console.log(err)
      })
  })

  const initials = computed(() => {
    return userFirstName.value.split('')[0] + userLastName.value.split('')[0]
  })

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
          userFirstName.value = formdata.get('first_name')
          userLastName.value = formdata.get('last_name')
          userEmail.value = formdata.get('email')

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

    toasts.add({
      msg: 'Logged out successfully.',
      duration: 4000
    })

    router.push({ name: 'index' })
  }

  const erase = () => {
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

  return { userEmail, userFirstName, userLastName, initials, update, logout, erase }
}
