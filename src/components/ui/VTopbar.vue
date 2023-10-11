<script setup>
import { ref } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'

const musicKeys = ['All Keys', ...setKeys]
const musicKeyLabel = ref('All Keys')
const searchValue = ref('')

const props = defineProps({
  topBarTitle: {
    type: String,
    required: true
  },
  topBarDesc: {
    type: String,
    required: true
  },
  topBarIcon: String
})

</script>

<template>
  <div class="grow overflow-y-auto px-16 pb-2">
    <!-- top bar -->
    <div
      class="sticky top-0 z-10 mt-12 flex flex-row items-center justify-between bg-stone-900 pb-2 pt-4"
    >
      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-4">
          <h1>{{ props.topBarTitle }}</h1>
          <span v-if="props.topBarIcon !== null" class="material-icons text-3xl"> {{ props.topBarIcon }} </span>
        </div>
        <div class="text-stone-400">{{ props.topBarDesc }}</div>
      </div>
      <div class="flex basis-[880px] flex-row items-center gap-2">
        <!-- search bar -->
        <span class="material-icons text-2xl text-stone-400"> search </span>
        <input v-model="searchValue" type="text" placeholder="Search" class="searchbar" />

        <!-- music keys dropdown -->
        <VDropdownList
          v-model:label="musicKeyLabel"
          :list="musicKeys"
          name="musicKeys"
          class="w-32"
        />

        <!-- create button -->
        <slot name="create-button" />
      </div>
    </div>

    <slot name="body" :musicKeyPicked="musicKeyLabel" :searchedText="searchValue" />
  </div>
</template>

<style scoped></style>
