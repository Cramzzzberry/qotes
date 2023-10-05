<script setup>
import { ref } from 'vue'
import VNavbar from '@/components/ui/VNavBar.vue'
import VCompactList from '@/components/ui/VCompactList.vue'
import VDropdownList from '@/components/ui/VDropdownList.vue'
import VWeekBlock from '@/components/ui/VWeekBlock.vue'
import VFileItem from '@/components/ui/VFileItem.vue'
import VTextBox from '@/components/ui/VTextBox.vue'

let date = new Date();

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

const recentFiles = ref([
  {
    'label': 'File name 1',
  },
  {
    'label': 'File name 2',
  },
  {
    'label': 'File name 3',
  },
  {
    'label': 'File name 4',
  },
])

const monthPicked = ref(months[date.getMonth()])
const yearPicked = ref(date.getFullYear().toString())
</script>

<template>
  <VNavbar />
  <div class="flex flex-row h-[calc(100vh-61px)]">
      <!-- side bar -->
    <div class="basis-[320px] pr-2 pb-4 pl-4 overflow-y-auto">
      <div class="sticky top-0 pt-4 bg-cod-gray-50">
        <!-- calendar filter -->
        <span class="menu-title">Filter</span>
        <div class="flex flex-row gap-2 py-1">
          <VDropdownList 
            :items="months" 
            v-model:label="monthPicked" 
            name="months" 
            class="dropdown-height-limit relative basis-3/5" 
          />

          <div class="basis-2/5">
            <VTextBox
              v-model="yearPicked"
              type="number" 
              class="w-full"
            />
          </div>
        </div>
      </div>
      <hr>
      
      <!-- Recent files -->
      <span class="menu-title">Recent Files</span>
      <VCompactList :icon="'insert_drive_file'" :lists="recentFiles"/>
    </div>

    <div class="pr-4 pb-4 pl-2 grow overflow-y-auto">
      <VWeekBlock v-for="n in 6" :week-number="n" :key="n">
        <VFileItem :url="'/edit/1'" :song-name="'Song name'" musicKey="C"/>
        <VFileItem :url="'/edit/2'" :song-name="'Song name'" musicKey="G"/>
        <VFileItem :url="'/edit/3'" :song-name="'Song name'" musicKey="A"/>
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb"/>
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb"/>
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb"/>
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb"/>
      </VWeekBlock>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit :deep(.dropdown-content) {
  max-height: calc(100vh - (82px + 61px + 16px + 16px));
}
</style>