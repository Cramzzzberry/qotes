<script setup>
import TheSidebar from '@/components/ui/TheSidebar.vue'
import AllSheetsTab from '@/components/tabs/AllSheetstab.vue'
import PinnedSheetsTab from '@/components/tabs/PinnedSheetstab.vue'
import ImportantSheetsTab from '@/components/tabs/ImportantSheetstab.vue'

const tabs = [AllSheetsTab, PinnedSheetsTab, ImportantSheetsTab]
</script>

<template>
  <TheSidebar v-slot="slotProps">
    <component :is="tabs[slotProps.index]"/>
  </TheSidebar>
</template>

<style scoped></style>
