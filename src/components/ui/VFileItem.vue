<script setup>
defineProps({
  songName: String,
  url: String,
  musicKey: String
})
</script>

<template>
  <router-link
    :to="url"
    class="flex h-fit flex-row items-center rounded-sm bg-transparent p-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-900"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-sm bg-ocean-green-400 text-3xl font-bold text-ocean-green-800"
    >
      {{ musicKey }}
    </div>
    <div class="px-2 py-0">
      <div class="flex w-full flex-col">
        <span class="font-semibold">{{ songName }}</span>
        <span class="text-sm italic text-cod-gray-400">Songwriter</span>
      </div>
    </div>
  </router-link>
</template>
