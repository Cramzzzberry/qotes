<script setup>
import { ref } from 'vue'

defineProps({ weekNumber: Number })

const createSheetModal = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <div class="sticky top-0 bg-cod-gray-50 pt-4">
      <div class="flex flex-row items-center justify-between">
        <h3>Week {{ weekNumber }} - September 2023</h3>
        <button
          @click="createSheetModal = true"
          class="flex items-center justify-center gap-1 rounded-sm py-1 pl-1 pr-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-900"
        >
          <span class="material-icons">add</span>
          Create
        </button>
      </div>
      <hr />
    </div>
    <div class="mb-2 grid grid-cols-4">
      <slot></slot>
    </div>
  </div>

  <!-- create file modal -->
  <VModal :toggler="createSheetModal">
    <form class="flex flex-col gap-4">
      <div class="flex flex-row items-center justify-between">
        <h2>Create a new sheet for Week {{ weekNumber }}</h2>
        <button
          @click="createSheetModal = false"
          type="button"
          class="flex items-center justify-center gap-2 rounded-sm p-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-900"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
      <label>
        Song Title
        <VTextBox inputType="text" />
      </label>
      <label>
        Songwritter/Singer
        <VTextBox inputType="text" />
      </label>
      <VButton class="w-full" type="submit"> Create </VButton>
    </form>
  </VModal>
</template>

<style scoped>
label {
  @apply flex w-full flex-col gap-1 text-cod-gray-600 transition-colors duration-100 ease-in-out focus-within:text-cod-gray-700;
}
</style>
