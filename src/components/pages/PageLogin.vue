<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toasts } from '@/composables/toast'

const router = useRouter()

const isLoginSection = ref(true)
const signupForm = ref(null)
const loginForm = ref(null)

const loginError = reactive({
  accExistence: false,
  password: false
})

const registerError = reactive({
  passLength: false,
  passConfirmation: false
})

async function createAccount() {
  const formdata = new FormData(signupForm.value)
  const createAccObj = {}

  if (formdata.get('password').length >= 8) {
    if (formdata.get('password') === formdata.get('confirm_password')) {
      formdata.forEach((value, key) => {
        if (key !== 'confirm_password') {
          createAccObj[key] = value
        }
      })

      await fetch('http://localhost:3000/users/create-account', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createAccObj)
      })
        .then(async (res) => {
          const response = await res.json()

          if (response.success) {
            isLoginSection.value = true

            registerError.passLength = false
            registerError.passConfirmation = false

            toasts.add({
              msg: 'Account created successfully.',
              duration: 4000
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      registerError.passLength = false
      registerError.passConfirmation = true
    }
  } else {
    registerError.passLength = true
    registerError.passConfirmation = false
  }
}

async function loginAccount() {
  const formdata = new FormData(loginForm.value)
  const logAccObj = {}

  formdata.forEach((value, key) => {
    logAccObj[key] = value
  })

  await fetch('http://localhost:3000/users/login-account', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logAccObj)
  })
    .then(async (res) => {
      const response = await res.json()

      if (res.status === 200) {
        toasts.add({
          msg: 'Logged in successfully.',
          duration: 4000
        })

        localStorage.setItem('token', response.token)
        localStorage.setItem('user_id', response.userId)

        loginError.accExistence = false
        loginError.password = false

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
      toasts.add({
        msg: err,
        duration: 4000
      })
    })
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <Transition name="fade-scale" mode="out-in">
      <!-- login section -->
      <form v-if="isLoginSection" @submit.prevent="loginAccount()" class="flex w-full max-w-[480px] flex-col gap-4" ref="loginForm">
        <h1>Login to your account</h1>
        <div class="flex flex-col items-center gap-4">
          <label>
            Email
            <VTextBox :class="[{ '!border-red-500': loginError.accExistence }]" inputType="email" name="email" required />
            <span v-if="loginError.accExistence" class="text-sm text-red-500">Account doesn't exist!</span>
          </label>
          <label>
            Password
            <VTextBox :class="[{ '!border-red-500': loginError.password || loginError.accExistence }]" inputType="password" name="password" required />
            <span v-if="loginError.password" class="text-sm text-red-500">Wrong Password!</span>
          </label>
        </div>

        <!-- login button -->
        <VButton type="submit" class="justify-center duration-150"> Login </VButton>

        <!-- registration section -->
        <div class="place-self-end">
          Don't have an account?
          <button
            @click.prevent="isLoginSection = !isLoginSection"
            type="button"
            class="text-emerald-400 transition-colors duration-100 ease-in-out hover:text-emerald-500"
          >
            Create one
          </button>
        </div>
      </form>

      <!-- create account section -->
      <form v-else @submit.prevent="createAccount()" class="flex w-full max-w-[480px] flex-col gap-4" ref="signupForm">
        <h1>Create your account</h1>
        <div class="flex flex-col items-center gap-4">
          <label>
            First Name
            <VTextBox inputType="text" name="first_name" required />
          </label>
          <label>
            Last Name
            <VTextBox inputType="text" name="last_name" required />
          </label>
          <label>
            Email
            <VTextBox inputType="email" name="email" required />
          </label>
          <label>
            Password
            <VTextBox :class="[{ '!border-red-500': registerError.passConfirmation }]" inputType="password" name="password" required />
            <span v-if="!registerError.passConfirmation" :class="[registerError.passLength ? 'text-red-500' : 'text-stone-400']" class="text-sm">
              Minimum of 8 characters
            </span>
            <span v-else class="text-sm text-red-500">Passwords are not the same!</span>
          </label>
          <label>
            Confirm Password
            <VTextBox :class="[{ '!border-red-500': registerError.passConfirmation }]" inputType="password" name="confirm_password" required />
            <span v-if="registerError.passConfirmation" class="text-sm text-red-500">Passwords are not the same!</span>
          </label>
        </div>

        <!-- login button -->
        <VButton type="submit" class="justify-center duration-150"> Create Account </VButton>

        <!-- registration section -->
        <div class="place-self-end">
          Already have an account?
          <button
            @click.prevent="isLoginSection = !isLoginSection"
            type="button"
            class="text-emerald-400 transition-colors duration-100 ease-in-out hover:text-emerald-500"
          >
            Login here
          </button>
        </div>
      </form>
    </Transition>
  </div>
</template>

<style scoped>
label {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
