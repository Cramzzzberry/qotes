<script setup>
defineProps({ weekNumber: Number })
</script>

<template>
  <div class="flex flex-col">
    <div class="sticky top-0 pt-4 bg-cod-gray-50">
      <h3>Week {{ weekNumber }} - September 2023</h3>
      <hr>
    </div>
    <div class="grid grid-cols-4 mb-2">
      <slot />
    </div>
  </div>
</template>