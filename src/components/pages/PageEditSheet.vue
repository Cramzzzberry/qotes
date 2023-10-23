<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { changeKey, setKeys } from '@/assets/scripts/change-key'
import sanitizeHtml from 'sanitize-html'
import parseSheet from '@/assets/scripts/parse-sheet'

const route = useRoute()

const songKey = ref(null)
const sheetInput = ref('')
const songTitle = ref(null)
const songWriter = ref(null)

const sheetHtml = computed(() => {
  return sanitizeHtml(parseSheet(sheetInput.value), {
    allowedAttributes: false
  })
})

onMounted(async () => {
  await fetch(`http://localhost:3000/sheets/get/sheet/${route.params.id}`).then(async (res) => {
    const response = await res.json()

    songTitle.value = response.song_title
    songWriter.value = response.song_writer
    songKey.value = response.song_key
    sheetInput.value = response.content

    //transposition watch
    watch(songKey, (newValue, oldValue) => {
      sheetInput.value = changeKey(sheetInput.value, newValue, oldValue)
    })
  })
})

async function saveSheet() {
  await fetch(`http://localhost:3000/sheets/update-sheet/${route.params.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      song_title: songTitle.value,
      song_writer: songWriter.value,
      song_key: songKey.value,
      content: sheetInput.value
    })
  })
    .then(async (res) => {
      console.log('Sheet saved')
    })
    .catch((err) => console.log(err))
}
</script>

<template>
  <div>
    <div
      class="sticky top-0 z-10 grid h-[61px] w-full grid-cols-3 items-center bg-stone-800 pl-2 pr-4 text-stone-400"
    >
      <div>
        <VButton @click="$router.go(-1)" btn-style="icon-ghost" type="button">
          <span class="material-icons"> arrow_back </span>
        </VButton>
      </div>

      <div class="text-center">
        <div class="font-semibold text-stone-300">{{ songTitle }}</div>
        <div class="text-sm">{{ songWriter }}</div>
      </div>

      <div class="flex flex-row items-center justify-end gap-8">
        <label class="flex flex-row items-center gap-4">
          <!-- transpose key dropdown -->
          <div>Key</div>
          <VDropdown
            v-model:label="songKey"
            :list="setKeys"
            btn-style="ghost"
            position="bottomEnd"
            name="months"
            class="dropdown-height-limit w-[80px]"
          />
        </label>
        <VButton @click="saveSheet()" btnStyle="icon-ghost" type="button">
          <span class="material-icons"> save </span>
        </VButton>
      </div>
    </div>

    <!-- the body -->
    <div class="grid h-[calc(100vh-61px)] grid-cols-2 overflow-y-hidden">
      <!-- sheet workspace -->
      <div class="border-r border-r-stone-800">
        <textarea
          v-model="sheetInput"
          spellcheck="false"
          class="h-full w-full resize-none border-none bg-stone-900 py-4 pl-4 font-['RobotoMono'] text-base text-stone-300 outline-none"
        ></textarea>
      </div>

      <!-- sheet display -->
      <div
        v-html="sheetHtml"
        class="markdown-preview h-full w-full overflow-y-auto border-l border-l-stone-800 p-[0.5in] font-['RobotoMono'] leading-6 text-stone-300"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit :deep(.dropdown-content) {
  max-height: calc(100vh - 68px);
}
</style>
