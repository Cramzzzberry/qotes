<script setup>
const props = defineProps({
  icon: String,
  lists: Array
})
</script>

<template>
  <ul>
    <li v-for="(item, index) in props.lists" :key="index">
      <a href="#"> <!-- TODO: I will change this if there are links now -->
        <span v-if="props.icon != null" class="material-icons">{{ props.icon }}</span>
        <span>{{ item.label }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  padding: 0.25rem 0;

  & > li > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem 0.75rem;
    border-radius: 4px;

    transition: background-color 25ms ease-in-out, color 25ms ease-in-out;

    &:hover {
      color: var(--gray-800);
      background-color: var(--gray-100);
    }
  }
}
</style>