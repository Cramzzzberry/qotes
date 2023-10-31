<script setup>
import { ref, watchEffect } from 'vue'
import { useSearch } from '@/composables/searchSheet'
import { useSelect } from '@/composables/select'

const props = defineProps({
  searchValue: String,
  category: String,
  musicKey: String
})

//for selected sheets
const select = useSelect()
const selectedSheets = ref([])

watchEffect(() => {
  if (selectedSheets.value.length > 0) {
    select.hasSelected.value = true
  } else {
    select.hasSelected.value = false
  }
  select.setNoOfSelection(selectedSheets.value)
})

//for sheets
let { sheets, loading } = { sheets: null, loading: null }

watchEffect(() => {
  selectedSheets.value = []
  ;({ sheets, loading } = useSearch(props.searchValue, props.category, props.musicKey))
})
</script>

<template>
  <VLoadingSheets v-if="loading" />

  <div v-else-if="sheets.length === 0 && !loading" class="flex h-[calc(100%-156px)] w-full items-center justify-center">No sheets available</div>

  <div v-else class="grid grid-cols-3 gap-2 px-16">
    <div
      v-for="(sheet, index) in sheets"
      :key="index"
      class="flex h-fit cursor-pointer flex-row items-center gap-1 rounded-xl p-2 transition-colors hover:bg-stone-800"
    >
      <router-link :to="`/edit/${sheet.id}`" class="flex grow flex-row items-center gap-1">
        <div class="flex h-16 w-16 items-center justify-center rounded-md bg-emerald-400 text-3xl font-semibold text-emerald-900">
          {{ sheet.song_key }}
        </div>
        <div class="px-2 py-0">
          <div class="flex w-full flex-col">
            <span class="text-lg font-medium leading-none">{{ sheet.song_title }}</span>
            <span class="text-sm text-stone-400">{{ sheet.song_writer }}</span>
          </div>
        </div>
      </router-link>

      <div>
        <!-- checkbox -->
        <input type="checkbox" class="invisible absolute -top-10" v-model="selectedSheets" :value="sheet.id" :id="sheet.id" />
        <label
          :for="sheet.id"
          class="flex cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-300"
        >
          <span v-if="!selectedSheets.includes(sheet.id)" class="material-icons select-none"> check_box_outline_blank </span>
          <span v-else class="material-icons select-none"> check_box </span>
        </label>
      </div>
    </div>
  </div>
</template>
