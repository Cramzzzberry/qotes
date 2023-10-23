<script setup>
import VButton from '@/components/ui/VButton.vue'

const props = defineProps({
  songId: String,
  songTitle: String,
  songWritter: String,
  url: String,
  musicKey: String
})

async function deleteSheet() {
  await fetch(`http://localhost:3000/sheets/delete-sheet/${props.songId}`, {
    method: 'DELETE',
    mode: 'cors'
  })
    .then(() => console.log('Deleted Successfully'))
    .catch((err) => console.log(err))

  window.location.reload()
}
</script>

<template>
  <router-link
    :to="`/edit/${props.songId}`"
    class="group inline-grid h-fit cursor-pointer items-center gap-1 rounded-xl p-2 transition-colors duration-100 ease-in-out hover:bg-stone-800"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-md bg-emerald-400 text-3xl font-semibold text-emerald-900"
    >
      {{ props.musicKey }}
    </div>
    <div class="px-2 py-0">
      <div class="flex w-full flex-col">
        <span class="text-lg font-medium leading-none">{{ props.songTitle }}</span>
        <span class="text-sm text-stone-400">{{ props.songWritter }}</span>
      </div>
    </div>
    <div class="opacity-0 group-hover:opacity-100">
      <VButton @click.prevent="deleteSheet()" btn-style="icon-ghost" type="button">
        <span class="material-icons"> delete </span>
      </VButton>
    </div>
  </router-link>
</template>

<style scoped>
a {
  grid-template-columns: max-content auto max-content;
}
</style>
