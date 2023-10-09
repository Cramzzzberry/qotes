<script setup>
import { ref } from 'vue'
const keys = ['All Keys', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
const keyLabel = ref('All Keys')
</script>

<template>
  <div class="h-screen grow overflow-y-auto px-16 pb-2">
    <div
      class="sticky top-0 mt-12 flex flex-row items-center justify-between bg-cod-gray-50 pb-2 pt-4"
    >
      <div class="flex flex-row items-center gap-4 text-3xl font-semibold">
        Important
        <span class="material-icons text-3xl"> lightbulb </span>
      </div>
      <div class="flex basis-[880px] flex-row items-center gap-2">
        <span class="material-icons text-2xl text-cod-gray-400"> search </span>
        <input
          type="text"
          placeholder="Search"
          class="grow border-b-2 border-b-cod-gray-200 bg-transparent p-2 outline-none transition-colors duration-100 ease-in-out focus:border-b-ocean-green-400"
        />
        <VDropdownList v-model:label="keyLabel" :list="keys" class="w-32" />
        <VButton class="border border-ocean-green-400">
          <span class="material-icons text-base"> create </span>
          <span class="pl-2">Create</span>
        </VButton>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <VFileItem
        v-for="n in 7"
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
