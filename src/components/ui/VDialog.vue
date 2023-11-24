<script setup>
const props = defineProps({
  state: Boolean,
  header: String,
  body: String,
  confirmLabel: String,
  cancelLabel: String
})
</script>

<template>
  <div
    class="absolute left-0 top-0 z-40 flex h-[100svh] w-screen items-center justify-center transition-all duration-150 ease-in-out on-md:p-8"
    :class="[props.state ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full bg-stone-950 opacity-25"></div>
    <div
      class="z-10 min-w-[400px] max-w-[640px] rounded-2xl bg-emerald-50 px-4 pb-4 pt-4 transition-transform duration-150 ease-in-out on-md:w-full on-md:min-w-0"
      :class="[props.state ? 'translate-y-0' : 'translate-y-4']"
    >
      <h2 class="px-2 pt-2">{{ props.header }}</h2>
      <p class="px-4 pb-4 pt-2 on-sm:px-2">{{ props.body }}</p>
      <div class="flex flex-row items-center justify-end gap-2 on-sm:flex-col-reverse">
        <VButton @click="$emit('cancel')" variant="ghost" class="on-sm:w-full on-sm:text-center">
          <span class="hidden on-sm:inline-block"></span>
          {{ props.cancelLabel }}
          <span class="hidden on-sm:inline-block"></span>
        </VButton>
        <VButton @click="$emit('confirm')" variant="ghost" class="on-sm:w-full on-sm:text-center">
          <span class="hidden on-sm:inline-block"></span>
          {{ props.confirmLabel }}
          <span class="hidden on-sm:inline-block"></span>
        </VButton>
      </div>
    </div>
  </div>
</template>
