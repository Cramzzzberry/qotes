<script setup></script>

<template>
  <button
    class="inline-grid items-center rounded-lg bg-ocean-green-400 px-4 py-2 text-base text-ocean-green-950 transition-colors duration-100 hover:bg-ocean-green-500"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  grid-template-columns: max-content auto max-content;
}
</style>
