<script setup>
defineProps({
  songTitle: String,
  songWritter: String,
  url: String,
  musicKey: String
})
</script>

<template>
  <router-link
    :to="url"
    class="flex h-fit flex-row items-center gap-1 rounded-xl px-8 py-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:border-cod-gray-100 hover:bg-cod-gray-100 hover:text-cod-gray-900"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-md bg-ocean-green-400 text-3xl font-semibold text-ocean-green-800"
    >
      {{ musicKey }}
    </div>
    <div class="px-2 py-0">
      <div class="flex w-full flex-col">
        <span class="text-lg font-medium leading-none">{{ songTitle }}</span>
        <span class="text-base italic text-cod-gray-400">{{ songWritter }}</span>
      </div>
    </div>
  </router-link>
</template>
