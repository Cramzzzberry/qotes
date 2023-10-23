<script setup>
import { ref } from 'vue'

import VTopbar from '@/components/ui/VTopbar.vue'
import { setKeys } from '@/assets/scripts/change-key'

const musicKeys = setKeys
const newSheetkey = ref('C')

const title = 'Important'
const desc = 'These are the sheets with the most priorities'
const icon = 'lightbulb'

const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)

const createSheetFormRef = ref(null)

async function createSheet() {
  const formdata = new FormData(createSheetFormRef.value)
  const createSheetForm = {}

  formdata.forEach((value, key) => {
    if (value === 'on') {
      createSheetForm[key] = true
    } else {
      createSheetForm[key] = value
    }
  })

  createSheetForm[
    'content'
  ] = `# ${createSheetForm.song_title} \n## ${createSheetForm.song_writer} Key of ${createSheetForm.song_key} \n---\nC D G  Am    BbmM7\nSample Lyrics`

  await fetch('http://localhost:3000/sheets/create-sheet', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createSheetForm)
  })
    .then(() => {
      console.log('Sheet creattion success')
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc">
    <template #create-button>
      <VButton @click="modalToggle()" class="border border-emerald-400 hover:border-emerald-500">
        <span class="material-icons text-base"> add </span>
        Create
      </VButton>
    </template>

    <template #body>
      <!-- sheet list -->
      <Suspense>
        <VSheetList fetch-url="http://localhost:3000/sheets/get/important-sheets" />

        <template #fallback>
          <VLoadingSheets />
        </template>
      </Suspense>

      <!-- create modal -->
      <VModal :state="modalState">
        <form @submit.prevent="createSheet()" class="flex flex-col gap-2" ref="createSheetFormRef">
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
              <input type="checkbox" name="important" checked />
              <span>Important</span>
            </label>
          </div>

          <!-- login button -->
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
