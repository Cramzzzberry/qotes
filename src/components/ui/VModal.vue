<script setup>
const props = defineProps({ state: Boolean })
</script>

<template>
  <div
    class="absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center transition-all duration-150 ease-in-out on-md:p-8"
    :class="[props.state ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full bg-stone-950 opacity-25"></div>
    <div
      class="z-10 max-h-[calc(100vh-32px)] min-w-[560px] overflow-y-auto rounded-2xl bg-emerald-50 p-6 transition-transform duration-150 ease-in-out on-md:w-full on-md:min-w-0"
      :class="[props.state ? 'translate-y-0' : 'translate-y-4']"
    >
      <slot></slot>
    </div>
  </div>
</template>
