<script setup>
import { ref } from 'vue'
import { useLogin } from '@/composables/login'
import { useSignup } from '@/composables/signup'

const signupForm = ref(null)
const loginForm = ref(null)

const { login, loginError } = useLogin(loginForm)
const { signUp, isSignUpPage, signUpError } = useSignup(signupForm)
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center px-8">
    <Transition name="fade-scale" mode="out-in">
      <!-- login section -->
      <form v-if="!isSignUpPage.state" @submit.prevent="login()" class="flex w-full max-w-[480px] flex-col gap-4" ref="loginForm">
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
            :sub-text="loginError.password || loginError.accExistence ? 'Wrong password!' : null"
            type="password"
            name="password"
            wide
            required
          />
        </div>

        <!-- login button -->
        <VButton color="primary" type="submit" class="justify-center"> Login </VButton>

        <!-- registration section -->
        <div class="text-right">
          Don't have an account?
          <button
            @click.prevent="isSignUpPage.toggle()"
            type="button"
            class="text-emerald-500 transition-colors duration-100 ease-in-out hover:text-emerald-600"
          >
            Create one
          </button>
        </div>
      </form>

      <!-- create account section -->
      <form v-else @submit.prevent="signUp()" class="flex w-full max-w-[480px] flex-col gap-4" ref="signupForm">
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
            wide
            required
          />
        </div>

        <!-- login button -->
        <VButton color="primary" type="submit" class="justify-center"> Create Account </VButton>

        <!-- registration section -->
        <div class="text-right">
          Already have an account?
          <button
            @click.prevent="isSignUpPage.toggle()"
            type="button"
            class="m-0 p-0 text-emerald-500 transition-colors duration-100 ease-in-out hover:text-emerald-600"
          >
            Login here
          </button>
        </div>
      </form>
    </Transition>
  </div>
</template>
