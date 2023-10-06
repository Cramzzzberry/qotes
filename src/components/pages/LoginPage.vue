<script setup></script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <form class="flex w-1/4 flex-col gap-4">
      <h1 class="text-ocean-green-400">Login your account</h1>
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
      <VButton type="submit"> Login </VButton>
      <div class="place-self-end">
        Don't have an account?
        <button
          type="button"
          class="text-ocean-green-400 transition-colors duration-100 ease-in-out hover:text-ocean-green-300"
        >
          Create one
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
label {
  @apply flex w-full flex-col gap-1 text-cod-gray-600 transition-colors duration-100 ease-in-out focus-within:text-cod-gray-700;
}
</style>
