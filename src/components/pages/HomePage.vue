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
  <div class="home-wrapper">
      <!-- side bar -->
    <div class="side-bar">
      <div class="upper-side-bar">
        <!-- calendar filter -->
        <span class="menu-title">Filter</span>
        <div class="calendar-filter">
          <VDropdownList 
            :items="months" 
            v-model:label="monthPicked" 
            name="months" 
            class="month-filter dropdown-height-limit" />

          <VDropdownList 
            :items="years" 
            v-model:label="yearPicked" 
            name="years" 
            class="year-filter dropdown-height-limit" />
        </div>
      </div>
      <hr>
      
      <!-- Recent files -->
      <span class="menu-title">Recent Files</span>
      <VCompactList :icon="'insert_drive_file'" :lists="recentFiles"/>
    </div>

    <div class="home-body">
      <VWeekBlock :week-number="1" />
      <VWeekBlock :week-number="2" />
      <VWeekBlock :week-number="3" />
      <VWeekBlock :week-number="4" />
    </div>
  </div>
</template>

<style scoped>
.home-wrapper {
  display: flex;
  flex-direction: row;
  height: calc(100vh - var(--nav-bar-height));
  padding: 0 160px;

  & > .side-bar {
    /* height: 100%; */
    flex-basis: 320px;
    padding: 0 8px 16px 16px;
    overflow-y: auto;

    & > .upper-side-bar {
      background-color: var(--gray-950);
      padding-top: 1rem;
      position: sticky;
      top: 0;
      & > .calendar-filter {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        padding: 0.25rem 0;

        & > .month-filter {
          flex-basis: 60%;
          position: relative;
        }

        & > .year-filter {
          flex-basis: 40%;
          position: relative;
        }

        & > .dropdown-height-limit :deep(.dropdown-content) {
          max-height: calc(100vh - (82px + 61px + 16px + 16px));
        }
      }
    }

    & > .recent-files {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.25rem 0;
    }
  }

  & > .home-body {
    padding: 0 16px 16px 8px;
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>