<script setup>
import { reactive } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'
import { useEditSheet } from '@/composables/editSheet'

const { songTitle, artist, sheetKey, sheetContent, isLoading, sheetContentHtml, save } = useEditSheet()
const isOnEdit = reactive({
  state: false,
  toggle() {
    this.state = !this.state
  }
})
</script>

<template>
  <div class="h-[100svh]">
    <div class="flex h-[69px] flex-row items-center justify-between border-b border-b-neutral-200 pl-2 pr-4">
      <div class="flex basis-1/2 flex-row items-center gap-3 on-sm:gap-1">
        <VButton @click="$router.go(-1)" variant="ghost icon" type="button" class="ml-2">
          <span class="material-icons"> arrow_back </span>
        </VButton>

        <div class="flex w-full flex-col items-center">
          <input
            type="text"
            v-model="songTitle"
            class="h-fit w-full rounded-sm bg-transparent px-1 text-lg font-semibold outline-stone-400 focus:outline"
          />
          <input type="text" v-model="artist" class="h-fit w-full rounded-sm bg-transparent px-1 outline-stone-400 focus:outline on-md:text-sm" />
        </div>
      </div>

      <div class="flex flex-row items-center justify-end gap-2 on-sm:gap-1">
        <label class="flex flex-row items-center">
          <!-- transpose key dropdown -->
          <span class="material-icons"> audiotrack </span>
          <VSelect
            v-model="sheetKey"
            :list="setKeys"
            variant="ghost"
            list-color="primary"
            position="bottom end"
            name="months"
            class="dropdown-height-limit w-[80px]"
          >
            {{ sheetKey }}
          </VSelect>
        </label>

        <label class="hidden cursor-pointer select-none items-center justify-center rounded-lg p-2 transition-colors hover:bg-stone-950/5 on-lg:flex">
          <input v-model="isOnEdit.state" type="checkbox" class="hidden" />
          <span v-if="isOnEdit.state" class="material-icons"> menu_book </span>
          <span v-else class="material-icons"> mode_edit </span>
        </label>

        <VButton @click="save()" variant="ghost icon" type="button">
          <span class="material-icons"> save </span>
        </VButton>
      </div>
    </div>

    <!-- the body -->
    <div v-if="isLoading" class="flex h-[calc(100svh-69px)] w-screen animate-pulse items-center justify-center">- loading sheets -</div>

    <div v-else class="flex h-[calc(100vh-69px)] flex-row overflow-y-hidden">
      <!-- sheet workspace -->
      <div
        :class="[isOnEdit.state ? 'on-lg:block' : 'on-lg:hidden', 'on-lg:basis-full']"
        class="basis-1/2 border-r border-r-neutral-200 on-lg:border-r-0"
      >
        <textarea
          v-model="sheetContent"
          spellcheck="false"
          class="h-full w-full resize-none border-none bg-emerald-50 py-4 pl-4 font-['RobotoMono'] text-base text-stone-800 outline-none on-lg:px-8 on-md:text-sm"
        ></textarea>
      </div>

      <!-- sheet display -->
      <div
        v-html="sheetContentHtml"
        :class="[isOnEdit.state ? 'on-lg:hidden' : 'on-lg:block', 'on-lg:basis-full']"
        class="markdown-preview h-full basis-1/2 overflow-y-auto border-l border-l-neutral-200 p-[0.5in] font-['RobotoMono'] text-stone-800 on-lg:border-l-0 on-sm:px-8 on-sm:py-4"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit:deep(div) {
  @apply max-h-[calc(100svh-76px)];
}
</style>
