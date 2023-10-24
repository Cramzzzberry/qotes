<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

import { setKeys } from '@/assets/scripts/change-key'
import { createSheet } from '@/assets/scripts/misc'

const musicKeys = setKeys
const newSheetkey = ref('C')

const title = 'All Sheets'
const desc = 'A collection of sheets including pinned and important ones'
const icon = 'description'
const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)

const sheetFormRef = ref(null)
</script>

<template>
  <VTopbar
    :top-bar-title="title"
    :top-bar-icon="icon"
    :top-bar-desc="desc"
    search-box-id="allSheetsSB"
    filter="all-sheets"
  >
    <template #create-button>
      <VButton @click="modalToggle()">
        <span class="material-icons text-base"> add </span>
        Create
      </VButton>
    </template>

    <template #body>
      <!-- list of sheets -->
      <Suspense>
        <VSheetList fetch-url="http://localhost:3000/sheets/get/all-sheets" />

        <template #fallback>
          <VLoadingSheets />
        </template>
      </Suspense>

      <!-- create modal -->
      <VModal :state="modalState">
        <form
          @submit.prevent="createSheet(sheetFormRef)"
          class="flex flex-col gap-2"
          ref="sheetFormRef"
        >
          <div class="flex flex-row items-center justify-between">
            <h2>Create a new sheet</h2>

            <!-- close button -->
            <VButton @click="modalToggle()" btn-style="icon-ghost" type="button">
              <span class="material-icons"> close </span>
            </VButton>
          </div>

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

          <div class="flex flex-row gap-2 text-stone-400">
            <label class="flex basis-1/2 cursor-pointer flex-row gap-2">
              <input type="checkbox" name="pinned" />
              <span>Pinned</span>
            </label>
            <label class="flex basis-1/2 cursor-pointer flex-row gap-2">
              <input type="checkbox" name="important" />
              <span>Important</span>
            </label>
          </div>

          <!-- create button -->
          <VButton type="submit" class="justify-center"> Create </VButton>
        </form>
      </VModal>
    </template>
  </VTopbar>
</template>

<style scoped>
label.input-text {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
