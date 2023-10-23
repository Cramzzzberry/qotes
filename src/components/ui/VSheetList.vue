<script setup>
// TODO: I need to remove the unnecessary props later
const props = defineProps({
  itemCount: String, //this are unneccessary
  fakeTImeout: String, //this are unneccessary
  fetchUrl: String
})

let sheets = await fetch(props.fetchUrl)
  .then(async (response) => response.json())
  .catch((err) => console.log(err))
</script>

<template>
  <Transition name="fade-up" appear>
    <div class="grid grid-cols-3 gap-2 px-16">
      <VSheet
        v-for="(sheet, index) in sheets"
        :key="index"
        :song-title="sheet.song_title"
        :song-writter="sheet.song_writter"
        :music-key="sheet.song_key"
        :url="`/edit/${sheet.id}`"
      />
    </div>
  </Transition>
</template>

<style scoped>
/* vue transitions */
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.fade-up-enter-active,
.fade-up-leave-active {
  overflow-x: clip;
  transition:
    opacity 100ms ease-in-out,
    transform 150ms ease-in-out;
}
</style>
