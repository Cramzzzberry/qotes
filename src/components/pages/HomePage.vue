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
      <component :is="tabs[slotProps.index]"/>
    </Transition>
  </TheSidebar>
</template>

<style scoped>
.fade-y-enter-from, .fade-y-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-y-enter-active, .fade-y-leave-active {
  transition: opacity 100ms ease-in-out, transform 150ms ease-in-out;
}
</style>
