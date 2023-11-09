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
    class="absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center transition-all duration-150 ease-in-out"
    :class="[props.state ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full bg-stone-950 opacity-50"></div>
    <div
      class="z-10 min-w-[400px] max-w-[640px] rounded-2xl bg-stone-800 px-4 pb-4 pt-4 transition-transform duration-150 ease-in-out"
      :class="[props.state ? 'translate-y-0' : 'translate-y-4']"
    >
      <h2 class="px-2 pt-2">{{ props.header }}</h2>
      <p class="px-4 pb-4 pt-2">{{ props.body }}</p>
      <div class="flex flex-row items-center justify-end gap-2">
        <VButton @click="$emit('cancel')" btn-style="ghost">{{ props.cancelLabel }}</VButton>
        <VButton @click="$emit('confirm')" btn-style="ghost">{{ props.confirmLabel }}</VButton>
      </div>
    </div>
  </div>
</template>
