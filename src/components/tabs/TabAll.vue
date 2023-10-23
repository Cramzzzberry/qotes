<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'All Sheets'
const desc = 'A collection of sheets including pinned and important ones'
const icon = 'description'
const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)

const createSheetFormRef = ref(null)

async function createSheet() {
  const formdata = new FormData(createSheetFormRef.value)
  const createFormObj = {}

  formdata.forEach((value, key) => {
    createFormObj[key] = value
  })

  console.log(createFormObj)
}
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc">
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
        <form @submit.prevent="createSheet()" class="flex flex-col gap-2" ref="createSheetFormRef">
          <div class="flex flex-row items-center justify-between">
            <h2>Create a new sheet</h2>

            <!-- close button -->
            <VButton @click="modalToggle()" btn-style="icon-ghost" type="button">
              <span class="material-icons"> close </span>
            </VButton>
          </div>

          <div class="flex flex-col items-center gap-2">
            <label>
              Song Title
              <VTextBox input-type="text" name="song_title" required />
            </label>
            <label>
              Singer/Songwritter
              <VTextBox input-type="text" name="song_writter" required />
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
label {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
