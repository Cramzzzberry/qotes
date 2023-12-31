<script setup>
import { ref } from 'vue'
import { useFetchSheets } from '@/composables/fetchSheets'
import { setKeys } from '@/assets/scripts/change-key'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Lineup'
const icon = 'push_pin'

const searchInput = ref('')
const keysLabel = ref('All Keys')
const keysList = ['All Keys', ...setKeys]

const { searchResults, isLoading, showLoadMore } = useFetchSheets(searchInput, 'lineup', keysLabel)
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon">
    <template #action-bar>
      <!-- search box -->
      <div class="grow">
        <label
          class="group flex cursor-text flex-row items-center rounded-xl border border-stone-400 px-3 transition-colors focus-within:border-emerald-500"
        >
          <span class="material-icons text-2xl text-stone-600 transition-colors group-focus-within:text-emerald-500"> search </span>
          <input
            v-model="searchInput"
            size="1"
            type="text"
            placeholder="Search"
            class="grow bg-transparent p-2 outline-none placeholder:text-stone-950/50"
          />
        </label>
      </div>

      <!-- music keys dropdown -->
      <VSelect v-model="keysLabel" :list="keysList" list-color="primary" position="bottom end" name="songkeys" class="dropdown-height-limit w-[82px]">
        <span v-if="keysLabel === 'All Keys'" class="material-icons text-[24px] on-md:text-[20px]"> piano </span>
        <span v-else>{{ keysLabel }}</span>
      </VSelect>
    </template>

    <template #body>
      <!-- list of sheets -->
      <VLoadingSheets v-if="isLoading" :fake-sheet-number="3" />

      <div
        v-else-if="searchResults.length === 0 && !isLoading"
        class="flex h-[calc(100%-132px)] w-full flex-col items-center justify-center text-neutral-950/25 on-lg:h-[calc(100%-186px)] on-md:h-[calc(100%-142px)]"
      >
        <span class="material-icons text-[80px]"> description </span>
        <span class="text-lg font-semibold">No sheets available</span>
      </div>

      <VSheetList v-else :sheet-list="searchResults" />
      <VLoadingSheets v-if="showLoadMore" :fake-sheet-number="3" />
    </template>
  </VTopbar>
</template>

<style scoped>
.dropdown-height-limit:deep(div) {
  @apply max-h-[calc(100svh-140px)] on-lg:max-h-[calc(100svh-140px-44px)] on-md:max-h-[calc(100svh-140px-92px)];
}
</style>
