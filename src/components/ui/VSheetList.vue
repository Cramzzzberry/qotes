<script setup>
import { ref, watch } from 'vue'
import { useSearch } from '@/composables/searchSheets'
import { useSelectedSheets, selection } from '@/composables/selectedSheets'
import { refreshToggle } from '@/composables/refreshSheetList'

const props = defineProps({
  searchValue: String,
  category: String,
  musicKey: String
})

/* Selected sheets section */
const selectedSheets = useSelectedSheets()
watch(
  //This also works on a false deep watcher
  //I think its because v-model removes then replaces arrays
  () => selection.list,
  () => {
    selectedSheets.setSelectedData()
  },
  { deep: true }
)

/* Search results section */
const searchResults = ref({})
watch(
  () => [props.searchValue, props.category, props.musicKey, refreshToggle.value],
  ([newSearchValue, newCategory, newMusicKey]) => {
    selection.list = []
    searchResults.value = useSearch(newSearchValue, newCategory, newMusicKey)
  },
  { immediate: true }
)
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
      class="flex h-fit cursor-pointer flex-row items-center gap-1 rounded-xl transition-colors hover:bg-stone-800"
    >
      <router-link :to="`/edit/${sheet.id}`" class="flex grow flex-row items-center gap-1 p-2">
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
      <div class="h-[80px] w-12">
        <input
          type="checkbox"
          class="invisible absolute -top-10"
          v-model="selection.list"
          :value="`${sheet.id}===${sheet.pinned}===${sheet.important}`"
          :id="sheet.id"
        />
        <label
          :for="sheet.id"
          class="flex h-full w-full cursor-pointer items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200"
        >
          <span v-if="!selection.list.includes(`${sheet.id}===${sheet.pinned}===${sheet.important}`)" class="material-icons select-none">
            check_box_outline_blank
          </span>
          <span v-else class="material-icons select-none"> check_box </span>
        </label>
      </div>
    </div>
  </div>
</template>
