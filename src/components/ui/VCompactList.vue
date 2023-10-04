<script setup>
const props = defineProps({
  icon: String,
  lists: Array
})
</script>

<template>
  <ul class="flex flex-col gap-1 py-1">
    <li v-for="(item, index) in props.lists" :key="index">
      <a 
        href="#"
        class="flex flex-row items-center gap-2 px-3 py-2 rounded-sm text-cod-gray-600 transition-colors 
        duration-[25ms] ease-in-out hover:text-cod-gray-800 hover:bg-cod-gray-100"
      > <!-- TODO: I will change this if there are links now -->
        <span v-if="props.icon != null" class="material-icons">{{ props.icon }}</span>
        <span>{{ item.label }}</span>
      </a>
    </li>
  </ul>
</template>