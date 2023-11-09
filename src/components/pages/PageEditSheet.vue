<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toasts } from '@/composables/toast'
import { changeKey, setKeys } from '@/assets/scripts/change-key'
import parseSheet from '@/assets/scripts/parse-sheet'
import sanitizeHtml from 'sanitize-html'

const route = useRoute()

/* sheet section */
const sheet = reactive({
  key: null,
  content: '',
  loading: true
})

const song = reactive({
  title: null,
  writer: null
})

onMounted(async () => {
  await fetch(`http://localhost:3000/sheets/get/sheet/${route.params.id}`).then(async (res) => {
    const response = await res.json()

    song.title = response.song_title
    song.writer = response.song_writer
    sheet.key = response.song_key
    sheet.content = response.content
    sheet.loading = false

    //transposition watch
    watch(
      () => sheet.key,
      (newKey, oldKey) => {
        sheet.content = changeKey(sheet.content, newKey, oldKey)
      }
    )
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
      song_title: song.title,
      song_writer: song.writer,
      song_key: sheet.key,
      content: sheet.content
    })
  })
    .then(() => {
      toasts.add({
        msg: 'Sheet saved successfully.',
        duration: 4000
      })
    })
    .catch((err) => console.log(err))
}

const sheetContentHtml = computed(() => {
  return sanitizeHtml(parseSheet(sheet.content), {
    allowedAttributes: false
  })
})
</script>

<template>
  <div>
    <div class="sticky top-0 z-10 grid h-[61px] w-full grid-cols-3 items-center bg-stone-800 pl-2 pr-4 text-stone-400">
      <div>
        <VButton @click="$router.go(-1)" btn-style="icon-ghost" type="button">
          <span class="material-icons"> arrow_back </span>
        </VButton>
      </div>

      <div class="flex flex-col items-center">
        <input
          type="text"
          v-model="song.title"
          class="h-fit w-full rounded-sm bg-transparent text-center font-semibold text-stone-300 outline-stone-400 focus:outline"
        />
        <input type="text" v-model="song.writer" class="h-fit w-full rounded-sm bg-transparent text-center text-sm outline-stone-400 focus:outline" />
      </div>

      <div class="flex flex-row items-center justify-end gap-8">
        <label class="flex flex-row items-center gap-4">
          <!-- transpose key dropdown -->
          <div>Key</div>
          <VDropdown
            v-model:label="sheet.key"
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
    <div v-if="sheet.loading" class="flex h-[calc(100vh-61px)] w-screen animate-pulse items-center justify-center">- loading sheets -</div>

    <div v-else class="grid h-[calc(100vh-61px)] grid-cols-2 overflow-y-hidden">
      <!-- sheet workspace -->
      <div class="border-r border-r-stone-800">
        <textarea
          v-model="sheet.content"
          spellcheck="false"
          class="h-full w-full resize-none border-none bg-stone-900 py-4 pl-4 font-['RobotoMono'] text-base text-stone-300 outline-none"
        ></textarea>
      </div>

      <!-- sheet display -->
      <div
        v-html="sheetContentHtml"
        class="markdown-preview h-full w-full overflow-y-auto border-l border-l-stone-800 p-[0.5in] font-['RobotoMono'] leading-6 text-stone-300"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit:deep(div) {
  max-height: calc(100vh - 76px);
}
</style>
