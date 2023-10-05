<script setup>
import VTextBox from '@/components/ui/VTextBox.vue';
import VButton from '@/components/ui/VButton.vue';
</script>

<template>
  <div class="flex justify-center items-center w-screen h-[1000px]">
    <form class="flex flex-col gap-4 w-1/4">
      <h1 class="text-ocean-green-400">Login your account</h1>
      <div class="flex flex-col items-center gap-4">
        <label>
          Email
          <VTextBox inputType="email"/>
        </label>
        <label>
          Password
          <VTextBox inputType="password"/>
        </label>
      </div>
      <VButton type="submit">
        Login
      </VButton>
    </form>
  </div>
</template>

<style scoped>
label {
  @apply flex flex-col gap-1 w-full text-cod-gray-600 transition-colors duration-100 ease-in-out focus-within:text-cod-gray-700;
}
</style>