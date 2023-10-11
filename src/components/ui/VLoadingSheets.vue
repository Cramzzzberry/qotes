<script setup></script>

<template>
  <div class="grid animate-pulse grid-cols-3 gap-2">
    <div v-for="n in 3" :key="n" class="flex h-fit flex-row items-center gap-1 rounded-xl p-2">
      <div class="h-16 w-16 rounded-md bg-stone-600"></div>
      <div class="grow px-2 py-0">
        <div class="flex flex-col gap-1">
          <div class="h-[1.125rem] w-full bg-stone-600"></div>
          <div class="h-[0.875rem] w-1/2 bg-stone-700"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
