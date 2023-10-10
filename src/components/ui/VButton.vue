<script setup>
defineProps({
  type: String
})
</script>

<template>
  <button
    :class="[
      type === 'ghost'
        ? 'bg-transparent text-stone-300 hover:bg-stone-600'
        : 'bg-emerald-400 text-emerald-950 hover:bg-emerald-500'
    ]"
    class="inline-grid select-none items-center rounded-lg px-4 py-2 text-base transition-colors duration-150"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  grid-template-columns: max-content auto max-content;
}
</style>
