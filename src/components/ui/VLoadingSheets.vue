<script setup>
const props = defineProps({
  fakeSheetNumber: Number
})
</script>

<template>
  <div class="grid animate-pulse grid-cols-3 gap-2 px-16 on-xl:grid-cols-2 on-lg:grid-cols-1 on-md:px-6 on-sm:grid-cols-1 on-sm:px-3">
    <div v-for="n in props.fakeSheetNumber" :key="n" class="flex h-fit flex-row items-center gap-1 rounded-xl p-2">
      <div class="h-16 w-16 cursor-wait rounded-md bg-neutral-950/10"></div>
      <div class="grow px-2 py-0">
        <div class="flex flex-col gap-1">
          <div class="h-[1.125rem] w-full cursor-wait rounded-sm bg-neutral-950/10"></div>
          <div class="h-[0.875rem] w-1/2 cursor-wait rounded-sm bg-neutral-950/10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
