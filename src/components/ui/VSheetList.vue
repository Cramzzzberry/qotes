<script setup>
import { selectionStore } from '@/store'
const props = defineProps({
  sheetList: Array
})
</script>

<template>
  <div class="grid grid-cols-3 gap-2 px-16 on-xl:grid-cols-2 on-lg:grid-cols-1 on-md:px-6 on-md:pb-20 on-sm:grid-cols-1 on-sm:px-3">
    <div
      v-for="(sheet, index) in props.sheetList"
      :key="index"
      class="flex h-fit cursor-pointer select-none flex-row items-center rounded-xl transition-colors hover:bg-stone-950/5"
    >
      <router-link :to="`/edit/${sheet.id}`" class="flex min-w-0 grow flex-row items-center gap-1 p-2">
        <div class="flex h-16 w-16 shrink-0 select-none items-center justify-center rounded-md bg-emerald-400 text-3xl font-semibold text-emerald-900">
          {{ sheet.song_key }}
        </div>
        <div class="min-w-0 px-2 py-0">
          <div class="flex w-full flex-col">
            <span class="truncate text-lg font-medium leading-none on-md:text-base">{{ sheet.song_title }}</span>
            <span class="truncate text-sm text-stone-600 on-md:text-[0.75rem]">{{ sheet.artist }}</span>
            <div class="flex select-none flex-row gap-1">
              <div v-if="sheet.pinned" class="gap-2 rounded-full border border-blue-400 px-2 text-[0.75rem] text-blue-400 on-md:text-[0.625rem]">
                Pinned
              </div>
              <div v-if="sheet.important" class="gap-2 rounded-full border border-amber-500 px-2 text-[0.75rem] text-amber-500 on-md:text-[0.625rem]">
                Important
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <!-- checkbox -->
      <div class="h-[80px] w-12">
        <input
          type="checkbox"
          class="invisible absolute -top-10"
          v-model="selectionStore.list"
          :value="`${sheet.id}===${sheet.pinned}===${sheet.important}`"
          :id="sheet.id"
        />
        <label
          :for="sheet.id"
          class="flex h-full w-full cursor-pointer items-center justify-center rounded-lg text-emerald-950 transition-colors hover:bg-stone-950/5 active:bg-stone-950/10"
        >
          <span v-if="!selectionStore.list.includes(`${sheet.id}===${sheet.pinned}===${sheet.important}`)" class="material-icons select-none">
            check_box_outline_blank
          </span>
          <span v-else class="material-icons select-none"> check_box </span>
        </label>
      </div>
    </div>
  </div>
</template>
