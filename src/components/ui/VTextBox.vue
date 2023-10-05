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
    class=" bg-transparent border rounded-sm outline-none border-cod-gray-200 text-cod-gray-700 
    text-base transition-colors duration-100 ease-in-out focus:border-ocean-green-400"
    :class="[inputType === 'number' ? 'py-2 pr-[0.625rem] pl-4' : 'py-2 px-4']"
  >
</template>

<style scoped>
::-ms-reveal {
  filter: invert(30%);
}
</style>