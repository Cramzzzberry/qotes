<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoginSection = ref(true)
const createAccForm = ref(null)
const logAccFormRef = ref(null)

// account login
async function logAccount() {
  const formdata = new FormData(logAccFormRef.value)
  const logAccObj = {}

  formdata.forEach((value, key) => {
    logAccObj[key] = value
  })

  await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logAccObj)
  })
    .then(async (res) => {
      const response = await res.json()

      if (response.success) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('loggedIn', true)
        router.push(`/home/${response.userId}`)
      } else {
        console.log('Account not existing')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// creating account
async function createAccount() {
  const formdata = new FormData(createAccForm.value)
  const createAccObj = {}

  formdata.forEach((value, key) => {
    if (key !== 'confirm_password') {
      createAccObj[key] = value
    }
  })

  if (formdata.get('confirm_password') === formdata.get('password')) {
    await fetch('http://localhost:3000/users/signup', {
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
          console.log('Registration Success')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    console.log('Passwords required are not the same!')
  }
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <Transition name="fade-scale" mode="out-in">
      <!-- login section -->
      <form
        v-if="isLoginSection"
        @submit.prevent="logAccount()"
        class="flex w-full max-w-[480px] flex-col gap-4"
        ref="logAccFormRef"
      >
        <h1>Login to your account</h1>
        <div class="flex flex-col items-center gap-4">
          <label>
            Email
            <VTextBox inputType="email" name="email" required />
          </label>
          <label>
            Password
            <VTextBox inputType="password" name="password" required />
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
      <form
        v-else
        @submit.prevent="createAccount()"
        class="flex w-full max-w-[480px] flex-col gap-4"
        ref="createAccForm"
      >
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
            <VTextBox inputType="password" name="password" required />
          </label>
          <label>
            Confirm Password
            <VTextBox inputType="password" name="confirm_password" required />
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

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(98.5%);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 100ms ease-in-out,
    transform 150ms ease-in-out;
}
</style>
