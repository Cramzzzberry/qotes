<script setup>
import VFileItem from '@/components/ui/VFileItem.vue'

const props = defineProps({
  fetchUrl: String,
  weekNumber: Number,
})
</script>

<template>
  <div class="week-block">
    <div class="week-name">
      <h2>Week {{ props.weekNumber }} - September 2023</h2>
      <hr>
    </div>
    <div class="file-grid">
      <VFileItem :url="'/edit/1'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/2'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/3'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/4'" :song-name="'Song name'" />
      <VFileItem :url="'/edit/5'" :song-name="'Song name'" />
    </div>
  </div>
</template>

<style scoped>
.week-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;

  & > .week-name {
    background-color: var(--gray-950);
    padding-top: 16px;
    position: sticky;
    top: 0;
  }

  & > .file-grid {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 16px;
  }
}
</style>