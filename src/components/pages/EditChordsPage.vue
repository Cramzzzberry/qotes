<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import sanitizeHtml from 'sanitize-html'
import parseSheet from '@/assets/scripts/parse-sheet'
import changeKey from '@/assets/scripts/change-key'
import VDropdownList from '@/components/ui/VDropdownList.vue';

const route = useRoute()
const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

const sheetInput = ref(`# Song Title ${ route.params.id }\n## Songwriter - Key of X\n---\n>> Intro\nG A C G (2x)\n>> Verse\n                   A    C\nKamukha mo si Paraluman\n                   G    G\nNung tayo ay bata pa`)
const keyPicked = ref('G')

watch(keyPicked, (newValue, oldValue) => {
  //replace the user input into transposed input
  sheetInput.value = changeKey(sheetInput.value, newValue, oldValue)
})

const sheetHtml = computed(() => {
  return sanitizeHtml(parseSheet(sheetInput.value), { allowedAttributes: false })
})
</script>

<template>
  <div class="sticky top-0 z-10 grid grid-cols-2 items-center w-full h-[61px] px-4 bg-cod-gray-50 border-b
  border-b-cod-gray-100">
    <div> <!-- back button -->
      <router-link
        to="/dashboard"
        class="flex flex-row items-center gap-2 w-fit py-[6px]"
      >
        <span class="material-icons">arrow_back</span>
        <span>Go back</span>
      </router-link>
    </div>
    <div class="flex flex-row justify-end items-center gap-8"> <!-- profile-cluster -->
      <div class="flex flex-row gap-4 items-center"> <!-- transpose key -->
        <div>Key</div>
        <VDropdownList 
          :items="keys" 
          v-model:label="keyPicked" 
          name="months"
          class="dropdown-height-limit w-[80px]"
        />
      </div>
      <a 
        href="#"
        class="flex flex-row items-center gap-2"
      >
        <span>Jan Roe Bantuan</span>
        <div class="shrink-0 rounded-full w-8 h-8 bg-ocean-green-400"></div>
      </a>
    </div>
  </div>

  <!-- the body -->
  <div class="grid grid-cols-2 h-[calc(100vh-61px)] overflow-y-hidden">
    <div class="border-r border-r-cod-gray-100">
      <textarea
        v-model="sheetInput"
        spellcheck="false"
        class="resize-none w-full h-full pl-4 py-4 border-none outline-none bg-cod-gray-50 text-cod-gray-950 
        text-base font-['RobotoMono']"
      ></textarea>
    </div>
    <div
      v-html="sheetHtml"
      class="markdown-preview border-l border-l-cod-gray-100 w-full h-full p-[0.5in] overflow-y-auto 
      font-['RobotoMono'] leading-6 text-cod-gray-800"
    ></div>
  </div>
</template>

<style scoped>
.dropdown-height-limit :deep(.dropdown-content) {
  max-height: calc(100vh - 68px);
}
</style>