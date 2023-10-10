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
    class="inline-grid h-fit items-center gap-1 rounded-xl p-2 transition-colors duration-100 ease-in-out hover:bg-stone-800"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-md bg-emerald-400 text-3xl font-semibold text-emerald-900"
    >
      {{ musicKey }}
    </div>
    <div class="px-2 py-0">
      <div class="flex w-full flex-col">
        <span class="text-lg font-medium leading-none">{{ songTitle }}</span>
        <span class="text-base text-stone-400">{{ songWritter }}</span>
      </div>
    </div>
    <div>
      <span class="material-icons"> more_vert </span>
    </div>
  </router-link>
</template>

<style scoped>
a {
  grid-template-columns: max-content auto max-content;
}
</style>
