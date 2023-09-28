<script setup>
import { ref } from 'vue';
import VNavbar from '../ui/VNavBar.vue';
import VCompactList from '../ui/VCompactList.vue';
import VDropdownMenu from '../ui/VDropdownMenu.vue';
import VWeekBlock from '../ui/VWeekBlock.vue';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

const years = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

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
]);

const monthPicked = ref('April');
const yearPicked = ref('2010');
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
          <VDropdownMenu 
            :items="months" 
            v-model:label="monthPicked" 
            name="months" 
            class="month-filter" />

          <VDropdownMenu 
            :items="years" 
            v-model:label="yearPicked" 
            name="years" 
            class="year-filter" />
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
    height: 100%;
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