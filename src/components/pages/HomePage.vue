<script setup>
import { ref } from 'vue'
import VNavbar from '@/components/ui/VNavbar.vue'
import AllSheetsTab from '@/components/tabs/AllSheetsTab.vue'
import ImportantSheetsTab from '@/components/tabs/ImportantSheetsTab.vue'
import PinnedSheetsTab from '@/components/tabs/PinnedSheetsTab.vue'

const isAll = ref(true)
const isPinned = ref(false)
const isImportant = ref(false)

const tabs = [AllSheetsTab, PinnedSheetsTab, ImportantSheetsTab]
const index = ref(0)

function getAll() {
  index.value = 0
  isAll.value = true
  isPinned.value = false
  isImportant.value = false
}

function getPinned() {
  index.value = 1
  isAll.value = false
  isPinned.value = true
  isImportant.value = false
}

function getImportant() {
  index.value = 2
  isAll.value = false
  isPinned.value = false
  isImportant.value = true
}
</script>

<template>
  <div>
    <!-- navbar -->
    <VNavbar>
      <!-- tabs -->
      <div class="flex h-full flex-row items-center justify-center">
        <button @click="getAll()" class="tab-btn" :class="[isAll ? 'active' : '']">All</button>
        <button @click="getPinned()" class="tab-btn" :class="[isPinned ? 'active' : '']">
          Pinned
        </button>
        <button @click="getImportant()" class="tab-btn" :class="[isImportant ? 'active' : '']">
          Important
        </button>
      </div>
    </VNavbar>

    <!-- body -->
    <div class="h-[calc(100vh-56px)] w-screen overflow-clip">
      <Transition name="fade-y" mode="out-in">
        <component :is="tabs[index]" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.dropdown-height-limit :deep(.dropdown-content) {
  max-height: calc(100vh - (82px + 61px + 16px + 16px));
}

.tab-btn {
  @apply relative flex h-full w-36 items-center justify-center font-medium text-cod-gray-500 transition-colors duration-150 ease-in-out 
  hover:text-cod-gray-800;
}

.tab-btn.active {
  @apply bg-transparent text-ocean-green-400;
}

.tab-btn::before {
  @apply absolute bottom-0 left-[16px] right-[16px] top-[calc(100%-2px)] rounded-full transition-all duration-150 ease-in-out content-[''];
}

.tab-btn.active::before {
  @apply bg-ocean-green-400;
}

/* vue transitions */
.fade-y-enter-active,
.fade-y-leave-active {
  transition: all 100ms ease-in-out;
}

.fade-y-enter-from,
.fade-y-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
