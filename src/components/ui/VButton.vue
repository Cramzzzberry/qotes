<script setup>
</script>

<template>
  <button><slot /></button>
</template>

<style scoped>
button {
  padding: 0.75rem 1rem;

  background-color: var(--green-400);
  border: none;
  border-radius: 4px;

  color: var(--green-950);
  font-size: 1rem;
}
</style>