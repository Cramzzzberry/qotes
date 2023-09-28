<script setup>
const props = defineProps({
  icon: String,
})
</script>

<template>
  <button>
    <span class="material-icons">
      {{ props.icon }}
    </span>
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  background-color: transparent;
  border-radius: 4px;
  border: none;
  color: var(--gray-500);

  user-select: none;
  transition: background-color 100ms ease-in-out, color 100ms ease-in-out;

  & > span.material-icons {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--gray-900);
    color: var(--gray-300);
  }

  &:active {
    background-color: var(--gray-700);
  }
}
</style>