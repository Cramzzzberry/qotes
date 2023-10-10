<script setup>
import TheSidebar from '@/components/ui/TheSidebar.vue'
import AllSheetsTab from '@/components/tabs/AllSheetstab.vue'
import PinnedSheetsTab from '@/components/tabs/PinnedSheetstab.vue'
import ImportantSheetsTab from '@/components/tabs/ImportantSheetstab.vue'

const tabs = [AllSheetsTab, PinnedSheetsTab, ImportantSheetsTab]
</script>

<template>
  <TheSidebar v-slot="slotProps">
    <Transition name="fade-y" mode="out-in">
      <component :is="tabs[slotProps.index]" />
    </Transition>
  </TheSidebar>
</template>

<style>
.searchbar {
  @apply grow border-b-2 border-b-stone-600 bg-transparent p-2 outline-none transition-colors duration-100 ease-in-out placeholder:text-stone-400 focus:border-b-emerald-400;
}
/* vue transitions */
.fade-y-enter-from,
.fade-y-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-y-enter-active,
.fade-y-leave-active {
  overflow-x: clip;
  transition:
    opacity 100ms ease-in-out,
    transform 150ms ease-in-out;
}
</style>
