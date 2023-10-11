<script setup>
// TODO: I think i need to have a fetch url props here
const props = defineProps({
  itemCount: String,
  fakeTImeout: String
})

async function fakeLoading() {
  await new Promise((resolve) => setTimeout(resolve, parseInt(props.fakeTImeout)))
}

await fakeLoading()
</script>

<template>
  <Transition name="fade-y" appear>
    <div class="grid grid-cols-3 gap-2">
      <VSheet
        v-for="n in parseInt(props.itemCount)"
        :key="n"
        :songTitle="`Magasin Chorus ${n}`"
        :songWritter="`Eraserheads ${n}`"
        musicKey="C"
        url="/edit/1"
      />
    </div>
  </Transition>
</template>

<style scoped>
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
