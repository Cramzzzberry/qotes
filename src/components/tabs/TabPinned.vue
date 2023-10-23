<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Pinned'
const desc = 'Put sheets here that are used in general'
const icon = 'push_pin'

const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)
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
      <!-- Sheet list -->
      <Suspense>
        <VSheetList fetch-url="http://localhost:3000/sheets/get/pinned-sheets" />

        <template #fallback>
          <VLoadingSheets />
        </template>
      </Suspense>

      <!-- create modal -->
      <VModal :state="modalState">
        <form class="flex flex-col gap-2">
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
              <VTextBox input-type="text" required />
            </label>
            <label>
              Singer/Songwritter
              <VTextBox input-type="text" required />
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
label {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
