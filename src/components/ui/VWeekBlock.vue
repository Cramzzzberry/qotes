<script setup>
import { ref } from 'vue'
import VTextBox from '@/components/ui/VTextBox.vue'
import VButton from '@/components/ui/VButton.vue';

defineProps({ weekNumber: Number })

const modalOpen = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <div class="sticky top-0 pt-4 bg-cod-gray-50">
      <div class="flex flex-row justify-between items-center">
        <h3>Week {{ weekNumber }} - September 2023</h3>
        <button 
          @click="modalOpen = true"
          class="flex justify-center items-center rounded-sm gap-1 pl-1 pr-2 py-1 text-cod-gray-600 transition-colors 
          duration-100 ease-in-out hover:text-cod-gray-900 hover:bg-cod-gray-100">
          <span class="material-icons">add</span>
          Create
        </button>
      </div>
      <hr>
    </div>
    <div class="grid grid-cols-4 mb-2">
      <slot />
    </div>
  </div>
  
  <div
    class="absolute top-0 left-0 flex justify-center items-center w-screen h-screen transition-all duration-100
    ease-in-out z-20"
    :class="[ modalOpen ? 'visible opacity-100' : 'invisible opacity-0' ]"
  >
    <div class="absolute top-0 w-full h-full bg-cod-gray-950 opacity-20 cursor-pointer"></div>
    <div
      class="rounded-sm w-[560px] p-6 bg-cod-gray-50 z-10 transition-transform duration-100 ease-in-out"
      :class="[ modalOpen ? 'translate-y-0' : 'translate-y-4' ]"
    >
      <form class="flex flex-col gap-4">
        <div class="flex flex-row justify-between items-center">
          <h2>Create a new sheet for Week {{ weekNumber }}</h2>
          <button 
            @click="modalOpen = false"
            type="button"
            class="flex justify-center items-center rounded-sm gap-2 p-2 text-cod-gray-600 transition-colors 
            duration-100 ease-in-out hover:text-cod-gray-900 hover:bg-cod-gray-100">
            <span class="material-icons">close</span>
          </button>
        </div>
        <label>
          Song Title
          <VTextBox inputType="text"/>
        </label>
        <label>
          Songwritter/Singer
          <VTextBox inputType="text"/>
        </label>
        <VButton class="w-full" type="submit">
          Create
        </VButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply flex flex-col gap-1 w-full text-cod-gray-600 transition-colors duration-100 ease-in-out focus-within:text-cod-gray-700;
}
</style>