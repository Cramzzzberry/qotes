<script setup>
import { ref } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'
import TheSheetList from '@/components/ui/TheSheetList.vue'

const musicKeys = ['All Keys', ...setKeys]
const musicKeyLabel = ref('All Keys')
</script>

<template>
  <div class="grow overflow-y-auto px-16 pb-2">
    <!-- top bar -->
    <div
      class="bg-cod-gray-50 sticky top-0 mt-12 flex flex-row items-center justify-between pb-2 pt-4"
    >
      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-4">
          <h1>Important</h1>
          <span class="material-icons text-3xl"> lightbulb </span>
        </div>
        <div class="text-stone-400">These are the sheets with the most priorities</div>
      </div>
      <div class="flex basis-[880px] flex-row items-center gap-2">
        <span class="material-icons text-cod-gray-400 text-2xl"> search </span>
        <input type="text" placeholder="Search" class="searchbar" />
        <VDropdownList
          v-model:label="musicKeyLabel"
          :list="musicKeys"
          position="bottom"
          class="w-32"
        />
        <VButton class="border border-emerald-400 hover:border-emerald-500">
          <span class="material-icons text-base"> create </span>
          <span class="pl-2">Create</span>
        </VButton>
      </div>
    </div>

    <!-- sheet list -->
    <Suspense>
      <TheSheetList itemCount="5" />

      <template #fallback>
        <div class="text-center">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
