<script setup>
</script>

<template>
  <input >
</template>

<style scoped>
input {
  padding: 0.75rem 1rem;

  background-color: transparent;
  border: 1px solid var(--gray-600);
  border-radius: 4px;
  outline: none;

  color: var(--gray-700);
  font-size: 1rem;

  transition: border 100ms ease-in-out;

  &:focus {
    border: 1px solid var(--green-400);
  }
}

::-ms-reveal {
  filter: invert(30%);
}
</style>