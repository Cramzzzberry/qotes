<script setup>
import { ref } from 'vue'
import { useSignup } from '@/composables/signup'

const signupForm = ref(null)

const { signUp, signUpError } = useSignup(signupForm)
</script>

<template>
  <div class="flex h-[100svh] w-screen items-center justify-center px-8">
    <!-- create account section -->
    <form @submit.prevent="signUp()" class="flex w-full max-w-[480px] flex-col gap-4" ref="signupForm">
      <h1>Create your account</h1>
      <div class="flex flex-col items-center gap-4">
        <VInput color="primary" label="First Name" type="text" name="first_name" wide required />
        <VInput color="primary" label="Last Name" type="text" name="last_name" wide required />
        <VInput color="primary" label="Email" type="email" name="email" wide required />
        <VInput
          :variant="signUpError.passLength || signUpError.passConfirm ? 'persistent outline' : null"
          :color="signUpError.passLength || signUpError.passConfirm ? 'error' : 'primary'"
          label="Password"
          :sub-text="signUpError.passConfirm ? 'Passwords are not the same!' : 'Minimum of 8 characters'"
          type="password"
          name="password"
          autocomplete="off"
          wide
          required
        />
        <VInput
          :variant="signUpError.passConfirm ? 'persistent outline' : null"
          :color="signUpError.passConfirm ? 'error' : 'primary'"
          label="Confirm Password"
          :sub-text="signUpError.passConfirm ? 'Passwords are not the same!' : null"
          type="password"
          name="confirm_password"
          autocomplete="off"
          wide
          required
        />
      </div>

      <!-- login button -->
      <VButton color="primary" type="submit" class="justify-center"> Create Account </VButton>

      <!-- registration section -->
      <div class="text-right">
        Already have an account?
        <router-link to="/login" class="text-emerald-500 transition-colors duration-100 ease-in-out hover:text-emerald-600">Login here</router-link>
      </div>
    </form>
  </div>
</template>
