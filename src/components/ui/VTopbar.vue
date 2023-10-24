<script setup>
import { ref } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'

const props = defineProps({
  topBarTitle: {
    type: String,
    required: true,
    default: 'Put title here'
  },
  topBarDesc: {
    type: String,
    required: true,
    default: 'Put description here'
  },
  topBarIcon: String,
  searchBoxId: String,
  filter: String
})

defineEmits(['update:search'])

const musicKeys = ['All Keys', ...setKeys]
const musicKeyLabel = ref('All Keys')

const searchValue = ref('')
</script>

<template>
  <div class="grow overflow-y-auto pb-2">
    <!-- top bar -->
    <div
      class="sticky top-0 z-10 flex flex-row items-center justify-between bg-stone-900 px-16 pb-2 pt-16"
    >
      <!-- topbar information -->
      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-4">
          <h1>{{ props.topBarTitle }}</h1>
          <span v-if="props.topBarIcon !== null" class="material-icons text-3xl">
            {{ props.topBarIcon }}
          </span>
        </div>
        <div class="text-stone-400">{{ props.topBarDesc }}</div>
      </div>

      <!-- action bar -->
      <div class="flex basis-[880px] flex-row items-center gap-2">
        <!-- search box -->
        <div class="group/search relative grow">
          <label class="flex flex-row items-center gap-2">
            <span class="material-icons text-2xl text-stone-400"> search </span>
            <input
              v-model="searchValue"
              type="text"
              placeholder="Search"
              class="grow border-b-2 border-b-stone-600 bg-transparent p-2 outline-none transition-colors duration-100 ease-in-out placeholder:text-stone-400 focus:border-b-emerald-400"
              :id="props.searchBoxId"
            />
          </label>

          <!-- search results -->
          <VSearchBlock
            :search-value="searchValue"
            :search-box-id="props.searchBoxId"
            :filter="props.filter"
          />
        </div>

        <!-- music keys dropdown -->
        <VDropdown v-model:label="musicKeyLabel" :list="musicKeys" name="musicKeys" class="w-32" />

        <!-- create button -->
        <slot name="create-button" />
      </div>
    </div>

    <slot name="body" />
  </div>
</template>
