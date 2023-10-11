<script setup>
import { ref } from 'vue'
import VTopbar from '@/components/ui/VTopbar.vue'

const openModal = ref(false)

const title = 'Important'
const desc = 'These are the sheets with the most priorities'
const icon = 'lightbulb'
</script>

<template>
  <VTopbar :topBarTitle="title" :topBarIcon="icon" :topBarDesc="desc">
    <template #create-button>
      <VButton
        @click="openModal = !openModal"
        class="border border-emerald-400 hover:border-emerald-500"
      >
        <span class="material-icons text-base"> add </span>
        <span class="pl-2">Create</span>
      </VButton>
    </template>

    <template #body>
      <!-- sheet list -->
      <Suspense>
        <VSheetList itemCount="5" fakeTImeout="1000" />

        <template #fallback>
          <VLoadingSheets />
        </template>
      </Suspense>

      <!-- create modal -->
      <VModal :toggler="openModal">
        <form class="flex flex-col gap-2">
          <div class="flex flex-row items-center justify-between">
            <h2>Create a new sheet</h2>

            <!-- close button -->
            <button
              @click="openModal = !openModal"
              type="button"
              class="flex items-center justify-center rounded-lg p-2 transition-colors duration-150 ease-in-out hover:bg-stone-700"
            >
              <span class="material-icons"> close </span>
            </button>
          </div>

          <div class="flex flex-col items-center gap-2">
            <label>
              Song Title
              <VTextBox inputType="text" required />
            </label>
            <label>
              Singer/Songwritter
              <VTextBox inputType="text" required />
            </label>
          </div>

          <!-- login button -->
          <VButton type="submit">
            <span></span>
            Create
            <span></span>
          </VButton>
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
