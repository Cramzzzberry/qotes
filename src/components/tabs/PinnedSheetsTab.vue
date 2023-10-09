<script setup>
import { ref } from 'vue'
const keys = ['All Keys', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
const keyLabel = ref('All Keys')
</script>

<template>
  <div class="h-screen w-full overflow-y-auto px-48 pb-2">
    <div
      class="sticky top-0 mt-12 flex flex-row items-center justify-between bg-cod-gray-50 pb-2 pt-4"
    >
      <div class="flex flex-row items-center gap-4 text-3xl font-semibold">
        Pinned
        <span class="material-icons text-3xl"> push_pin </span>
      </div>
      <div class="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Search for sheets"
          class="w-96 border-b-2 border-b-cod-gray-200 bg-transparent px-2 outline-none transition-colors duration-100 ease-in-out focus:border-b-ocean-green-400"
        />
        <VDropdownList v-model:label="keyLabel" :list="keys" class="w-32" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-1">
      <VFileItem
        v-for="n in 4"
        :key="n"
        :songTitle="`Ang Huling El Bimbo ver ${n}`"
        :songWritter="`Eraserheads ${n}`"
        musicKey="C"
        url="/edit/1"
      />
    </div>
  </div>
</template>

<style scoped></style>
