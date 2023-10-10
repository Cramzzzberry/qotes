<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import sanitizeHtml from 'sanitize-html'
import parseSheet from '@/assets/scripts/parse-sheet'
import changeKey from '@/assets/scripts/change-key'

const route = useRoute()
const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

const sheetInput = ref(
  `# Song Title ${route.params.id}\n## Songwriter - Key of X\n---\n>> Intro\nC E Am F\nC E Am Fm\nOoh...\n\n>> Chorus\nC\nIba na ang 'yong ngiti\nE\nIba na ang 'yong tingin.\nAm                     F\nNagbago nang lahat sa'yo\nC\nSana'y hindi magkita\nE\nSana'y walang problema\nAm                      F        Fm\nPagkat kulang ang dala kong pera`
)
const keyPicked = ref('C')

watch(keyPicked, (newValue, oldValue) => {
  //replace the user input into transposed input
  sheetInput.value = changeKey(sheetInput.value, newValue, oldValue)
})

const sheetHtml = computed(() => {
  return sanitizeHtml(parseSheet(sheetInput.value), { allowedAttributes: false })
})
</script>

<template>
  <div>
    <div
      class="sticky top-0 z-10 grid h-[61px] w-full grid-cols-2 items-center bg-stone-800 px-4 text-stone-400"
    >
      <div>
        <a
          @click="$router.go(-1)"
          class="flex w-fit cursor-pointer flex-row items-center gap-2 py-[6px] transition-colors duration-150 ease-in-out hover:text-stone-300"
        >
          <!-- back button -->
          <span class="material-icons">arrow_back</span>
          <span>Go back</span>
        </a>
      </div>
      <div class="flex flex-row items-center justify-end gap-8">
        <!-- profile-cluster -->
        <div class="flex flex-row items-center gap-4">
          <!-- transpose key -->
          <div>Key</div>
          <VDropdownList
            :list="keys"
            v-model:label="keyPicked"
            name="months"
            class="dropdown-height-limit w-[80px]"
          />
        </div>
        <div class="flex select-none flex-row items-center gap-2">
          <span>Jan Roe Bantuan</span>
          <div class="h-10 w-10 shrink-0 overflow-clip rounded-full bg-emerald-400">
            <img src="@/assets/Cramzzzberry logo.png" alt="profile-pic" class="object-cover" />
          </div>
        </div>
      </div>
    </div>

    <!-- the body -->
    <div class="grid h-[calc(100vh-61px)] grid-cols-2 overflow-y-hidden">
      <div class="border-r border-r-stone-800">
        <textarea
          v-model="sheetInput"
          spellcheck="false"
          class="h-full w-full resize-none border-none bg-stone-900 py-4 pl-4 font-['RobotoMono'] text-base text-stone-300 outline-none"
        ></textarea>
      </div>
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
