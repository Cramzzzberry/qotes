<script setup>
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Important'
const desc = 'These are the sheets with the most priorities'
const icon = 'lightbulb'
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc">
    <template #body="slotProps">
      <!-- list of sheets -->
      <VSheetList category="important-sheets" :search-value="slotProps.searchValue" :music-key="slotProps.selectedKey" />
    </template>
  </VTopbar>
</template>
