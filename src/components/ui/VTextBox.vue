<script setup>
const props = defineProps({
  inputType: String
})
</script>

<template>
  <input
    :type="props.inputType"
    :class="[props.inputType === 'number' ? 'py-2 pl-4 pr-[0.625rem]' : 'px-4 py-2']"
    class="rounded-lg border border-stone-600 bg-transparent text-base text-stone-200 outline-none transition-colors duration-100 ease-in-out focus:border-emerald-400"
  />
</template>

<style scoped>
::-ms-reveal {
  filter: invert(90%);
}
</style>
