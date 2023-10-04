<script setup>
import VFileItem from '@/components/ui/VFileItem.vue'

const props = defineProps({
  fetchUrl: String,
  weekNumber: Number,
})
</script>

<template>
  <div class="flex flex-col gap-2 mb-3">
    <div class="sticky top-0 pt-4 bg-cod-gray-50">
      <h2>Week {{ props.weekNumber }} - September 2023</h2>
      <hr>
    </div>
    <div class="grid gap-1 grid-cols-3 mb-4">
      <VFileItem :url="'/edit/1'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/2'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/3'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/4'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/5'" :song-name="'Song name'" />
    </div>
  </div>
</template>