<script setup>
import { ref } from 'vue'
import VCompactList from '@/components/ui/VCompactList.vue'
import VDropdownList from '@/components/ui/VDropdownList.vue'
import VWeekBlock from '@/components/ui/VWeekBlock.vue'
import VFileItem from '@/components/ui/VFileItem.vue'
import VTextBox from '@/components/ui/VTextBox.vue'

let date = new Date()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const recentFiles = [
  {
    label: 'File name 1'
  },
  {
    label: 'File name 2'
  },
  {
    label: 'File name 3'
  },
  {
    label: 'File name 4'
  }
]

const monthPicked = ref(months[date.getMonth()])
const yearPicked = ref(date.getFullYear().toString())
</script>

<template>
  <!-- navbar -->
  <div
    class="sticky top-0 grid h-[61px] w-full grid-cols-3 items-center border-b border-b-cod-gray-100 bg-cod-gray-50 px-4 py-2"
  >
    <div>
      <router-link
        to="/dashboard"
        class="text-2xl font-semibold text-ocean-green-400 transition-colors duration-100 hover:text-ocean-green-300"
      >
        Achord
      </router-link>
    </div>
    <VTextBox inputType="text" placeholder="Search here..." class="h-full" />
    <div class="flex flex-row justify-end">
      <div class="flex select-none flex-row items-center gap-2">
        <span>Jan Roe Bantuan</span>
        <div class="h-10 w-10 shrink-0 overflow-clip rounded-full bg-ocean-green-400">
          <img src="@/assets/Cramzzzberry logo.png" alt="profile-pic" class="object-cover" />
        </div>
      </div>
    </div>
  </div>

  <!-- body -->
  <div class="flex h-[calc(100vh-61px)] flex-row">
    <!-- side bar -->
    <div class="basis-[320px] overflow-y-auto pb-4 pl-4 pr-2">
      <div class="sticky top-0 bg-cod-gray-50 pt-4">
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
            <VTextBox v-model="yearPicked" type="number" placeholder="Year" class="w-full" />
          </div>
        </div>
      </div>
      <hr />

      <!-- Recent files -->
      <span class="menu-title">Recent Files</span>
      <VCompactList :icon="'insert_drive_file'" :lists="recentFiles" />
    </div>

    <div class="grow overflow-y-auto pb-4 pl-2 pr-4">
      <VWeekBlock v-for="n in 6" :week-number="n" :key="n">
        <VFileItem :url="'/edit/1'" :song-name="'Song name'" musicKey="C" />
        <VFileItem :url="'/edit/2'" :song-name="'Song name'" musicKey="G" />
        <VFileItem :url="'/edit/3'" :song-name="'Song name'" musicKey="A" />
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb" />
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb" />
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb" />
        <VFileItem :url="'/edit/4'" :song-name="'Song name'" musicKey="Bb" />
      </VWeekBlock>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit :deep(.dropdown-content) {
  max-height: calc(100vh - (82px + 61px + 16px + 16px));
}
</style>
