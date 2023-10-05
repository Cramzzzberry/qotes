<script setup>
defineProps({
  songName: String,
  url: String,
  musicKey: String,
})
</script>

<template>
  <router-link 
    :to="url" 
    class="flex flex-row items-center rounded-sm bg-transparent p-3 text-cod-gray-700 h-fit transition-colors
    duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-800"
  >
    <div class="flex justify-center items-center h-16 w-16 rounded-sm bg-ocean-green-400 text-ocean-green-800 text-3xl
      font-bold">
      {{ musicKey }}
    </div>
    <div class="px-2 py-0">
      <div class="flex flex-col w-full">
        <span>{{ songName }}</span>
        <span class="text-cod-gray-600 text-sm italic">Songwriter</span>
      </div>
    </div>
  </router-link>
</template>