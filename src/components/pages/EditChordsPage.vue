<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import sanitizeHtml from 'sanitize-html'
import parseSheet from '@/assets/scripts/parse-sheet'
import changeKey from '@/assets/scripts/change-key'
import VDropdownList from '@/components/ui/VDropdownList.vue';

const route = useRoute()
const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
const sheetInput = ref(`# Song Title ${ route.params.id }\n## Songwriter - Key of X\n---\n>> Intro\nC    G  Am  F\nThis is a lyrics`)

const keyPicked = ref('C')

watch(keyPicked, (newValue, oldValue) => {
  sheetInput.value = changeKey(sheetInput.value, newValue, oldValue)
})

const sheetHtml = computed(() => {
  return sanitizeHtml(parseSheet(sheetInput.value), { allowedAttributes: false })
})
</script>

<template>
  <div class="sticky top-0 z-10 grid grid-cols-2 items-center w-full h-[61px] px-4 bg-cod-gray-50 border-b
  border-b-cod-gray-100">
    <div> <!-- logo -->
      <router-link
        to="/dashboard"
        class="flex flex-row items-center gap-2 w-fit py-[6px]"
      >
        <span class="material-icons">arrow_back</span>
        <span>Go back</span>
      </router-link>
    </div>
    <div class="flex flex-row justify-end items-center gap-8"> <!-- profile-cluster -->
      <VDropdownList 
        :items="keys" 
        v-model:label="keyPicked" 
        name="months"
        class="w-[80px]"
      />
      <a 
        href="#"
        class="flex flex-row items-center gap-2"
      >
        <span>Jan Roe Bantuan</span>
        <div class="shrink-0 rounded-full w-8 h-8 bg-ocean-green-400"></div>
      </a>
    </div>
  </div>

  <div class="grid grid-cols-2 h-[calc(100vh-61px)]">
    <div class="border-r border-r-cod-gray-100 p-4">
      <textarea
        v-model="sheetInput"
        spellcheck="false"
        class="resize-none w-full h-full border-none outline-none bg-cod-gray-50 text-cod-gray-950 text-base
        font-['RobotoMono']"
      ></textarea>
    </div>
    <div
      v-html="sheetHtml"
      class="markdown-preview border-l border-l-cod-gray-100 w-full h-full p-[0.5in] overflow-y-auto 
      font-['RobotoMono'] leading-6 text-cod-gray-800"
    ></div>
  </div>
</template>