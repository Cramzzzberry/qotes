<script setup></script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <form class="flex w-1/4 flex-col gap-4">
      <h1>Login your account</h1>
      <div class="flex flex-col items-center gap-4">
        <label>
          Email
          <VTextBox inputType="email" />
        </label>
        <label>
          Password
          <VTextBox inputType="password" />
        </label>
      </div>

      <!-- login button -->
      <VButton @click="$router.push('/home')" class="duration-150" type="button">
        <span></span>
        Login
        <span></span>
      </VButton>

      <!-- registration section -->
      <div class="place-self-end">
        Don't have an account?
        <button
          type="button"
          class="text-emerald-400 transition-colors duration-100 ease-in-out hover:text-emerald-500"
        >
          Create one
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
label {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
