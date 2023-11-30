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
      <div class="flex basis-1/2 flex-row items-center gap-3 on-sm:gap-2">
        <VButton @click="$router.go(-1)" variant="ghost icon" type="button" class="ml-2">
          <span class="material-icons"> arrow_back </span>
        </VButton>

        <div class="flex w-full flex-col items-center">
          <input
            type="text"
            v-model="songTitle"
            class="h-fit w-full rounded-sm bg-transparent px-1 text-lg font-semibold outline-neutral-400 focus:outline"
          />
          <input type="text" v-model="artist" class="h-fit w-full rounded-sm bg-transparent px-1 outline-neutral-400 focus:outline on-md:text-sm" />
        </div>
      </div>

      <div class="flex flex-row items-center justify-end gap-2">
        <div class="hidden select-none flex-row items-center gap-1 on-lg:flex">
          <span class="material-icons text-lg"> mode_edit </span>
          <label class="relative flex h-[22px] w-[40px] cursor-pointer items-center rounded-full border border-neutral-400 bg-neutral-200 p-[2px]">
            <input v-model="isOnEdit.state" type="checkbox" class="hidden" />
            <div
              :class="{ 'translate-x-[calc(100%-2px)]': !isOnEdit.state }"
              class="absolute flex h-[18px] w-[18px] items-center justify-center rounded-full border border-neutral-300 bg-neutral-50 transition-transform"
            ></div>
          </label>
          <span class="material-icons text-lg"> menu_book </span>
        </div>

        <!-- transpose key dropdown -->
        <VSelect v-model="sheetKey" :list="setKeys" list-color="primary" position="bottom end" name="months" class="dropdown-height-limit w-[80px]">
          {{ sheetKey }}
        </VSelect>

        <button
          @click="save()"
          class="absolute bottom-4 right-4 z-10 flex h-16 w-16 items-center justify-center rounded-[16px] bg-amber-200 text-amber-900 transition-colors hover:bg-amber-300"
        >
          <span class="material-icons text-3xl leading-none"> save </span>
        </button>
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
          class="h-full w-full resize-none border-none bg-emerald-50 pb-[6rem] pl-4 pt-4 font-['RobotoMono'] text-base text-neutral-800 outline-none on-lg:px-8 on-md:text-sm"
        ></textarea>
      </div>

      <!-- sheet display -->
      <div
        v-html="sheetContentHtml"
        :class="[isOnEdit.state ? 'on-lg:hidden' : 'on-lg:block', 'on-lg:basis-full']"
        class="markdown-preview h-full basis-1/2 overflow-y-auto border-l border-l-neutral-200 px-[0.5in] pb-[5rem] pt-[0.5in] font-['RobotoMono'] text-neutral-800 on-lg:border-l-0 on-sm:px-8 on-sm:pt-4"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit:deep(div) {
  @apply max-h-[calc(100svh-76px)];
}
</style>
