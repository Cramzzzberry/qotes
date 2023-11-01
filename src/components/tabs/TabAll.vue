<script setup>
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'All Sheets'
const desc = 'A collection of sheets including pinned and important ones'
const icon = 'description'
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc">
    <template #body="slotProps">
      <!-- list of sheets -->
      <VSheetList category="all-sheets" :search-value="slotProps.searchValue" :music-key="slotProps.selectedKey" />
    </template>
  </VTopbar>
</template>
