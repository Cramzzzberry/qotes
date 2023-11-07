<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/toast'

const props = defineProps({
  firstName: String,
  lastName: String,
  email: String
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

function logoutAccount() {
  localStorage.setItem('token', '')
  localStorage.setItem('user_id', '')

  toast.addToast({
    msg: 'Logged out successfully.',
    duration: 4000
  })

  router.push({ name: 'index' })
}

async function deleteAccount() {
  await fetch(`http://localhost:3000/users/delete-account/${route.params.userId}`, {
    method: 'DELETE',
    mode: 'cors'
  })
    .then(() => {
      localStorage.setItem('token', '')
      localStorage.setItem('user_id', '')

      console.log('account deleted')
      router.push('/')
    })
    .catch((err) => console.log(err))
}

const updateAccountFormRef = ref(null)
async function updateAccount() {
  const formdata = new FormData(updateAccountFormRef.value)
  const updateAccountForm = {}

  formdata.forEach((value, key) => {
    updateAccountForm[key] = value
  })

  await fetch(`http://localhost:3000/users/user/${route.params.userId}`)
    .then(async () => {
      await fetch(`http://localhost:3000/users/update-account/${route.params.userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateAccountForm)
      })
        .then(() => {
          window.location.reload()
          console.log('update profile success')
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <form @submit.prevent="updateAccount()" ref="updateAccountFormRef">
    <!-- change fields section -->
    <div class="flex flex-col items-center gap-2">
      <!-- email -->
      <label class="input-labels">
        Email
        <VTextBox input-type="email" :value="props.email" name="email" />
      </label>

      <!-- full name -->
      <div class="flex w-full flex-row items-center gap-2">
        <label class="flex basis-1/2 flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200">
          First Name
          <VTextBox input-type="text" :value="props.firstName" name="first_name" />
        </label>
        <label class="flex basis-1/2 flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200">
          Last Name
          <VTextBox input-type="text" :value="props.lastName" name="last_name" />
        </label>
      </div>

      <!-- actions -->
      <VButton color-state="info" type="submit" class="w-full justify-center">
        <span class="material-icons"> update </span>
        Update Account
      </VButton>
      <div class="flex w-full flex-row items-center justify-between px-2">
        <button
          @click="deleteAccount()"
          type="button"
          class="flex flex-row items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
        >
          <span class="material-icons text-base"> delete </span>
          Delete Account
        </button>
        <button
          @click="logoutAccount()"
          type="button"
          class="flex flex-row items-center gap-2 text-sm text-stone-400 transition-colors hover:text-stone-200"
        >
          <span class="material-icons text-base"> logout </span>
          Logout
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.input-labels {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
