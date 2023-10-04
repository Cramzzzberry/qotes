<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import sanitizeHtml from 'sanitize-html'
import htmlParse from '@/assets/scripts/chordsheet'

const route = useRoute()

const csInput = ref(`# Song Title ${ route.params.id }\n## Songwriter - Key of X\n---\n>> Intro\nC    G  Am  F\nThis is a lyrics`)
const csHtml = computed(() => sanitizeHtml(htmlParse(csInput.value), { allowedAttributes: false }))

const pdf = ref(null)
</script>

<template>
  <div class="sticky top-0 grid grid-cols-2 items-center w-full h-[61px] px-4 bg-cod-gray-50 border-b
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
        v-model="csInput"
        spellcheck="false"
        class="resize-none w-full h-full border-none outline-none bg-cod-gray-50 text-cod-gray-950 text-base
        font-['RobotoMono']"
      ></textarea>
    </div>
    <div
      v-html="csHtml"
      ref="pdf"
      class="markdown-preview border-l border-l-cod-gray-100 w-full h-full p-[0.5in] overflow-y-auto 
      font-['RobotoMono'] leading-6 text-cod-gray-800"
    ></div>
  </div>
</template>