<script setup>
import { ref } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'

const musicKeys = ['All Keys', ...setKeys]
const musicKeyLabel = ref('All Keys')
</script>

<template>
  <div class="h-screen grow overflow-y-auto px-16 pb-2">
    <div
      class="bg-cod-gray-50 sticky top-0 mt-12 flex flex-row items-center justify-between pb-2 pt-4"
    >
      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-4">
          <h1>Pinned</h1>
          <span class="material-icons text-3xl"> push_pin </span>
        </div>
        <div class="text-stone-400">Put sheets here that are used in general</div>
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
    <div class="grid grid-cols-3 gap-2">
      <VFileItem
        v-for="n in 5"
        :key="n"
        :songTitle="`Magasin Chorus ${n}`"
        :songWritter="`Eraserheads ${n}`"
        musicKey="C"
        url="/edit/1"
      />
    </div>
  </div>
</template>

<style scoped></style>
