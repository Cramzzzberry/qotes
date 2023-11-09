<script setup>
const props = defineProps({ state: Boolean })
</script>

<template>
  <div
    class="absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center transition-all duration-150 ease-in-out"
    :class="[props.state ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full bg-stone-950 opacity-50"></div>
    <div
      class="z-10 min-w-[560px] rounded-2xl bg-stone-800 p-6 transition-transform duration-150 ease-in-out"
      :class="[props.state ? 'translate-y-0' : 'translate-y-4']"
    >
      <slot></slot>
    </div>
  </div>
</template>
