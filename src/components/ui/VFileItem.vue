<script setup>
const props = defineProps({
  songName: String,
  url: String
})
</script>

<template>
  <router-link :to="props.url" class="box">
    <div class="key">
      E
    </div>
    <div class="details-wrapper">
      <div class="details">
        <span>{{ props.songName }}</span>
        <span class="info">Songwriter</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.box {
  align-items: center;
  background-color: var(--gray-900);
  border-radius: 4px;
  color: var(--gray-300);
  display: flex;
  flex-direction: row;
  height: fit-content;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: var(--gray-800);
  }

  & > .key {
    align-items: center;
    background-color: var(--green-400);
    border-radius: 4px;
    color: var(--green-900);
    display: flex;
    font-size: 40px;
    height: 75px;
    justify-content: center;
    width: 75px;
  }

  & > .details-wrapper {
    padding: 0 8px;

    & > .details {
      display: flex;
      flex-direction: column;
      width: 100%;

      & > .info {
        color: var(--gray-400);
        font-size: 0.875rem;
        font-style: italic;
      }
    }
  }
}
</style>