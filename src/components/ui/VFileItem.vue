<script setup>
const props = defineProps({
  songName: String,
  url: String
})
</script>

<template>
  <router-link 
    :to="props.url" 
    class="flex flex-row items-center rounded-sm bg-transparent border border-cod-gray-200 text-cod-gray-700 h-fit 
    transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:border-cod-gray-100 
    hover:text-cod-gray-800"
  >
    <div class="flex justify-center items-center h-20 w-20 rounded-sm bg-ocean-green-400 text-ocean-green-700 text-5xl">
      E
    </div>
    <div class="px-2 py-0">
      <div class="flex flex-col w-full">
        <span>{{ props.songName }}</span>
        <span class="text-cod-gray-600 text-sm italic">Songwriter</span>
      </div>
    </div>
  </router-link>
</template>