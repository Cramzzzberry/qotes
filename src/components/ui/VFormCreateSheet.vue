<script setup>
import { ref } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'
import { useCreateSheet } from '@/composables/createSheet'

const musicKeys = setKeys
const newSheetkey = ref('C')
const sheetFormRef = ref(null)
const labelSelection = ref([])
</script>

<template>
  <form @submit.prevent="useCreateSheet(sheetFormRef)" class="flex flex-col gap-2" ref="sheetFormRef">
    <div class="flex flex-col items-center gap-2">
      <label class="input-text">
        Song Title
        <VTextBox input-type="text" name="song_title" required />
      </label>
      <label class="input-text">
        Singer/Songwriter
        <VTextBox input-type="text" name="song_writer" required />
      </label>
    </div>

    <div class="flex flex-col gap-1">
      <span class="text-stone-400">Key</span>
      <ul class="grid grid-cols-4 gap-1 rounded-lg border border-stone-600 p-2">
        <!-- dropdown content -->
        <li v-for="key in musicKeys" :key="key" class="w-full">
          <input
            type="radio"
            name="song_key"
            :id="key + ' id'"
            :checked="newSheetkey === key"
            :value="key"
            v-model="newSheetkey"
            class="peer absolute -top-10 hidden"
          />
          <label
            :for="key + ' id'"
            tabindex="0"
            class="block w-full cursor-pointer whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-stone-400 transition-colors duration-100 ease-in-out hover:bg-stone-600 hover:text-stone-200 peer-checked:bg-emerald-400 peer-checked:text-emerald-900"
          >
            {{ key }}
          </label>
        </li>
      </ul>
    </div>

    <div class="flex flex-row justify-around gap-2 text-stone-400">
      <!-- pinned checkbox -->
      <input type="checkbox" class="invisible absolute -top-10" v-model="labelSelection" value="pinned" name="pinned" id="pinned" />
      <label
        for="pinned"
        class="flex cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-300"
      >
        <span v-if="!labelSelection.includes('pinned')" class="material-icons select-none"> check_box_outline_blank </span>
        <span v-else class="material-icons select-none"> check_box </span>
        <span class="pl-2">Pinned</span>
      </label>

      <!-- important checkbox -->
      <input type="checkbox" class="invisible absolute -top-10" v-model="labelSelection" value="important" name="important" id="important" />
      <label
        for="important"
        class="flex cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-300"
      >
        <span v-if="!labelSelection.includes('important')" class="material-icons select-none"> check_box_outline_blank </span>
        <span v-else class="material-icons select-none"> check_box </span>
        <span class="pl-2">Important</span>
      </label>
    </div>

    <!-- create button -->
    <VButton type="submit" class="justify-center"> Create </VButton>
  </form>
</template>

<style scoped>
label.input-text {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
