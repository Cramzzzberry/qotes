<script setup>
defineProps(['modelValue', 'inputType'])
defineEmits(['update:modelValue'])
</script>

<template>
  <!-- I used a v-bind:type to have a ternary operator on v-bind:class -->
  <input
    :type="inputType"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="rounded-sm border border-cod-gray-200 bg-transparent text-base text-cod-gray-700 outline-none transition-colors duration-100 ease-in-out focus:border-ocean-green-400"
    :class="[inputType === 'number' ? 'py-2 pl-4 pr-[0.625rem]' : 'px-4 py-2']"
  />
</template>

<style scoped>
::-ms-reveal {
  filter: invert(30%);
}
</style>
