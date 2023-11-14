<script setup>
import { ref } from 'vue'
import { useFetchSheets } from '@/composables/fetchSheets'
import { setKeys } from '@/assets/scripts/change-key'
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Important'
const desc = 'These are the sheets with the most priorities'
const icon = 'lightbulb'

const searchInput = ref('')
const dropdownKeys = ['All Keys', ...setKeys]
const dropdownLabel = ref('All Keys')

const { searchResults, isLoading } = useFetchSheets(searchInput, 'important-sheets', dropdownLabel)
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc">
    <template #action-bar>
      <!-- search box -->
      <div class="group/search relative grow">
        <label class="flex flex-row items-center gap-2">
          <span class="material-icons text-2xl text-stone-400"> search </span>
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search"
            class="grow border-b-2 border-b-stone-600 bg-transparent p-2 outline-none transition-colors duration-100 ease-in-out placeholder:text-stone-400 focus:border-b-emerald-400"
          />
        </label>
      </div>

      <!-- music keys dropdown -->
      <VDropdown v-model:label="dropdownLabel" :list="dropdownKeys" name="songkeys" class="dropdown-height-limit w-32" />
    </template>

    <template #body>
      <!-- list of sheets -->
      <VLoadingSheets v-if="isLoading" />

      <div v-else-if="searchResults.length === 0 && !isLoading" class="flex h-[calc(100%-156px)] w-full items-center justify-center">
        No sheets available
      </div>

      <VSheetList v-else :sheet-list="searchResults" />
    </template>
  </VTopbar>
</template>

<style scoped>
.dropdown-height-limit:deep(div) {
  max-height: calc(100vh - 140px);
}
</style>
