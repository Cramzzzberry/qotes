<script setup>
import { ref, watchEffect } from 'vue'
import { useSearch } from '@/composables/searchSheets'
import { useSelectedSheets } from '@/composables/selectedSheets'
import { socket } from '@/socket'

const props = defineProps({
  searchValue: String,
  category: String,
  musicKey: String
})

//selected sheets
const selectedSheets = useSelectedSheets()
const selection = ref([])
watchEffect(() => {
  selectedSheets.getSelectedData(selection.value)
})

//websocket for realtime updates
const updateTrigger = ref(1)

socket.on('sheet created', () => {
  updateTrigger.value *= -1
})

socket.on('sheets updated', () => {
  updateTrigger.value *= -1
})
socket.on('sheets deleted', () => {
  updateTrigger.value *= -1
})

//sheet list
const searchResults = ref({})
watchEffect(() => {
  selection.value = []
  searchResults.value = useSearch(props.searchValue, props.category, props.musicKey)

  updateTrigger.value //added this just for the sake of realtime ui update
})
</script>

<template>
  <VLoadingSheets v-if="searchResults.loadState" />

  <div v-else-if="searchResults.sheets.length === 0 && !searchResults.loadState" class="flex h-[calc(100%-156px)] w-full items-center justify-center">
    No sheets available
  </div>

  <div v-else class="grid grid-cols-3 gap-2 px-16">
    <div
      v-for="(sheet, index) in searchResults.sheets"
      :key="index"
      class="flex h-fit cursor-pointer flex-row items-center gap-1 rounded-xl p-2 transition-colors hover:bg-stone-800"
    >
      <router-link :to="`/edit/${sheet.id}`" class="flex grow flex-row items-center gap-1">
        <div class="flex h-16 w-16 select-none items-center justify-center rounded-md bg-emerald-400 text-3xl font-semibold text-emerald-900">
          {{ sheet.song_key }}
        </div>
        <div class="px-2 py-0">
          <div class="flex w-full flex-col">
            <span class="text-lg font-medium leading-none">{{ sheet.song_title }}</span>
            <span class="text-sm text-stone-400">{{ sheet.song_writer }}</span>
            <div class="flex select-none flex-row gap-1">
              <span v-if="sheet.pinned" class="rounded-full border border-blue-400 px-2 text-[0.75rem] text-blue-400">Pinned</span>
              <span v-if="sheet.important" class="rounded-full border border-amber-400 px-2 text-[0.75rem] text-amber-400">Important</span>
            </div>
          </div>
        </div>
      </router-link>

      <!-- checkbox -->
      <div class="h-16 w-10">
        <input
          type="checkbox"
          class="invisible absolute -top-10"
          v-model="selection"
          :value="`${sheet.id}===${sheet.pinned}===${sheet.important}`"
          :id="sheet.id"
        />
        <label
          :for="sheet.id"
          class="flex h-full w-full cursor-pointer items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-300"
        >
          <span v-if="!selection.includes(`${sheet.id}===${sheet.pinned}===${sheet.important}`)" class="material-icons select-none">
            check_box_outline_blank
          </span>
          <span v-else class="material-icons select-none"> check_box </span>
        </label>
      </div>
    </div>
  </div>
</template>
