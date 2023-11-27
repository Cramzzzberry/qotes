<script setup>
import { ref } from 'vue'
import { useLogin } from '@/composables/login'
const loginForm = ref(null)

const { login, loginError } = useLogin(loginForm)
</script>

<template>
  <div class="flex h-[100svh] w-screen items-center justify-center px-8">
    <!-- login section -->
    <form @submit.prevent="login()" class="flex w-full max-w-[480px] flex-col gap-4" ref="loginForm">
      <h1>Login to your account</h1>
      <div class="flex flex-col items-center gap-4">
        <VInput
          :variant="loginError.accExistence ? 'persistent outline' : null"
          :color="loginError.accExistence ? 'error' : 'primary'"
          label="Email"
          :sub-text="loginError.accExistence ? 'Account doesn\'t exist!' : null"
          type="email"
          name="email"
          wide
          required
        />
        <VInput
          :variant="loginError.password || loginError.accExistence ? 'persistent outline' : null"
          :color="loginError.password || loginError.accExistence ? 'error' : 'primary'"
          label="Password"
          :sub-text="loginError.password ? 'Wrong password!' : null"
          type="password"
          name="password"
          autocomplete="off"
          wide
          required
        />
      </div>

      <!-- login button -->
      <VButton color="primary" type="submit" class="justify-center"> Login </VButton>

      <!-- registration section -->
      <div class="text-right">
        Don't have an account?
        <router-link to="/signup" class="text-emerald-500 transition-colors duration-100 ease-in-out hover:text-emerald-600">Create one</router-link>
      </div>
    </form>
  </div>
</template>
