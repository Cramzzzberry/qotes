<script setup>
import { ref } from 'vue'
const props = defineProps({
  checkId: String
})

const checked = ref(false)
const hideIcon = () => (checked.value = !checked.value)
</script>

<template></template>
