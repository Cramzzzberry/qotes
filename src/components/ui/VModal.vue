<script setup>
defineProps({ toggler: Boolean })
</script>

<template>
  <div
    class="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center transition-all duration-100 ease-in-out"
    :class="[toggler ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full bg-cod-gray-950 opacity-20"></div>
    <div
      class="z-10 w-[560px] rounded-sm bg-cod-gray-50 p-6 transition-transform duration-100 ease-in-out"
      :class="[toggler ? 'translate-y-0' : 'translate-y-4']"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
