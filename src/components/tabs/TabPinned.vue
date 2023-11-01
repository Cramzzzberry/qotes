<script setup>
import VTopbar from '@/components/ui/VTopbar.vue'

const title = 'Pinned'
const desc = 'Put sheets here that are used in general'
const icon = 'push_pin'
</script>

<template>
  <VTopbar :top-bar-title="title" :top-bar-icon="icon" :top-bar-desc="desc">
    <template #body="slotProps">
      <!-- Sheet list -->
      <VSheetList category="pinned-sheets" :search-value="slotProps.searchValue" :music-key="slotProps.selectedKey" />
    </template>
  </VTopbar>
</template>
