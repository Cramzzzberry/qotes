<script setup>
import { ref } from 'vue'
import VNavbar from '@/components/ui/VNavBar.vue'
import VCompactList from '@/components/ui/VCompactList.vue'
import VDropdownList from '@/components/ui/VDropdownList.vue'
import VWeekBlock from '@/components/ui/VWeekBlock.vue'

let date = new Date();

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

function getRangeOfYears(currentYr) {
  let rangeOfYears = []

  for(var i = 5; i >= 0; i--) {
    rangeOfYears.push(currentYr - i)
  }

  rangeOfYears.push(currentYr + 1)

  return rangeOfYears
}

const years = getRangeOfYears(date.getFullYear())

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

          <VDropdownList 
            :items="years" 
            v-model:label="yearPicked" 
            name="years" 
            class="dropdown-height-limit relative basis-2/5"
          />
        </div>
      </div>
      <hr>
      
      <!-- Recent files -->
      <span class="menu-title">Recent Files</span>
      <VCompactList :icon="'insert_drive_file'" :lists="recentFiles"/>
    </div>

    <div class="pr-4 pb-4 pl-2 grow overflow-y-auto">
      <VWeekBlock :week-number="1" />
      <VWeekBlock :week-number="2" />
      <VWeekBlock :week-number="3" />
      <VWeekBlock :week-number="4" />
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit :deep(.dropdown-content) {
  max-height: calc(100vh - (82px + 61px + 16px + 16px));
}
</style>