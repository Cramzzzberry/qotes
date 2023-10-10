<script setup></script>

<template>
  <button
    class="inline-grid items-center rounded-lg bg-emerald-400 px-4 py-2 text-base text-emerald-950 transition-colors duration-150 hover:bg-emerald-500"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  grid-template-columns: max-content auto max-content;
}
</style>
