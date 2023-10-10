<script setup>
defineProps({
  itemCount: Number
})

async function fakeLoading() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
}

await fakeLoading()
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <VFileItem
      v-for="n in parseInt(itemCount)"
      :key="n"
      :songTitle="`Magasin Chorus ${n}`"
      :songWritter="`Eraserheads ${n}`"
      musicKey="C"
      url="/edit/1"
    />
  </div>
</template>

<style scoped></style>
