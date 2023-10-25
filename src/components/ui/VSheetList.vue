<script setup>
import { watchEffect } from 'vue'
import { useSearch } from '@/composables/searchSheet'

const props = defineProps({
  searchValue: String,
  searchBoxId: String,
  category: String,
  musicKey: String
})

let { sheets, loading } = { sheets: null, loading: null }

watchEffect(() => {
  ;({ sheets, loading } = useSearch(props.searchValue, props.searchBoxId, props.category, props.musicKey))
})
</script>

<template>
  <div v-if="sheets.length === 0 && !loading" class="flex h-[calc(100%-156px)] w-full items-center justify-center">No sheets available</div>

  <div v-if="loading" class="flex h-[calc(100%-156px)] w-full animate-pulse items-center justify-center">Loading</div>

  <div v-else class="grid grid-cols-3 gap-2 px-16">
    <VSheet
      v-for="(sheet, index) in sheets"
      :key="index"
      :song-title="sheet.song_title"
      :song-writter="sheet.song_writer"
      :music-key="sheet.song_key"
      :songId="sheet.id"
    />
  </div>
</template>
