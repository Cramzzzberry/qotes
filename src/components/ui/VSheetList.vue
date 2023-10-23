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
    <div v-if="sheets.length !== 0" class="grid grid-cols-3 gap-2 px-16">
      <VSheet
        v-for="(sheet, index) in sheets"
        :key="index"
        :song-title="sheet.song_title"
        :song-writter="sheet.song_writer"
        :music-key="sheet.song_key"
        :songId="sheet.id"
      />
    </div>

    <div v-else class="flex h-[calc(100%-156px)] w-full items-center justify-center">
      No sheets available
    </div>
  </Transition>
</template>
