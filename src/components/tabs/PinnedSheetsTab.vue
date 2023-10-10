<script setup>
import { ref } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'

const musicKeys = ['All Keys', ...setKeys]
const musicKeyLabel = ref('All Keys')
const openModal = ref(false)
</script>

<template>
  <div class="h-screen grow overflow-y-auto px-16 pb-2">
    <div
      class="bg-cod-gray-50 sticky top-0 mt-12 flex flex-row items-center justify-between bg-stone-900 pb-2 pt-4"
    >
      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-4">
          <h1>Pinned</h1>
          <span class="material-icons text-3xl"> push_pin </span>
        </div>
        <div class="text-stone-400">Put sheets here that are used in general</div>
      </div>
      <div class="flex basis-[880px] flex-row items-center gap-2">
        <span class="material-icons text-cod-gray-400 text-2xl"> search </span>
        <input type="text" placeholder="Search" class="searchbar" />
        <VDropdownList
          v-model:label="musicKeyLabel"
          :list="musicKeys"
          position="bottom"
          class="w-32"
        />
        <VButton
          @click="openModal = !openModal"
          class="border border-emerald-400 hover:border-emerald-500"
        >
          <span class="material-icons text-base"> create </span>
          <span class="pl-2">Create</span>
        </VButton>
      </div>
    </div>

    <!-- Sheet list -->
    <Suspense>
      <VSheetList itemCount="4" fakeTImeout="1000" />

      <template #fallback>
        <div class="animate-pulse text-center">Loading...</div>
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
  </div>
</template>

<style scoped>
label {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
