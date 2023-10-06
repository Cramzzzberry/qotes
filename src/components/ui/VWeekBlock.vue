<script setup>
import { ref } from 'vue'
import VTextBox from '@/components/ui/VTextBox.vue'
import VButton from '@/components/ui/VButton.vue'

defineProps({ weekNumber: Number })

const modalOpen = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <div class="sticky top-0 bg-cod-gray-50 pt-4">
      <div class="flex flex-row items-center justify-between">
        <h3>Week {{ weekNumber }} - September 2023</h3>
        <button
          @click="modalOpen = true"
          class="flex items-center justify-center gap-1 rounded-sm py-1 pl-1 pr-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-900"
        >
          <span class="material-icons">add</span>
          Create
        </button>
      </div>
      <hr />
    </div>
    <div class="mb-2 grid grid-cols-4">
      <slot />
    </div>
  </div>

  <div
    class="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center transition-all duration-100 ease-in-out"
    :class="[modalOpen ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full cursor-pointer bg-cod-gray-950 opacity-20"></div>
    <div
      class="z-10 w-[560px] rounded-sm bg-cod-gray-50 p-6 transition-transform duration-100 ease-in-out"
      :class="[modalOpen ? 'translate-y-0' : 'translate-y-4']"
    >
      <form class="flex flex-col gap-4">
        <div class="flex flex-row items-center justify-between">
          <h2>Create a new sheet for Week {{ weekNumber }}</h2>
          <button
            @click="modalOpen = false"
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
    </div>
  </div>
</template>

<style scoped>
label {
  @apply flex w-full flex-col gap-1 text-cod-gray-600 transition-colors duration-100 ease-in-out focus-within:text-cod-gray-700;
}
</style>
