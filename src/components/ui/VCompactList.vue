<script setup>
defineProps({
  icon: String,
  lists: Array
})
</script>

<template>
  <ul class="flex flex-col gap-1 py-1">
    <li v-for="(item, index) in lists" :key="index">
      <a
        href="#"
        class="flex flex-row items-center gap-2 rounded-sm px-3 py-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-800"
      >
        <!-- TODO: I will change this if there are links now -->
        <span v-if="icon != null" class="material-icons">{{ icon }}</span>
        <span>{{ item.label }}</span>
      </a>
    </li>
  </ul>
</template>
