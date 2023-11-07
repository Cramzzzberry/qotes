<script setup>
import { ref, watch } from 'vue'
import { useToast } from '@/composables/toast'

const toast = useToast()

const displayAlert = ref([])
let timeout = null

//This will kickstart when there is a new alert
watch(toast.toasts.value, () => {
  if (toast.toasts.value.length >= 1 && timeout === null) {
    setTimeout(() => {
      displayAlert.value.push(toast.toasts.value[0].msg)
    }, 150)

    timeout = setTimeout(() => {
      toast.toasts.value.shift()
      displayAlert.value.shift()
      timeout = null
    }, toast.toasts.value[0].duration)
  }
})
</script>

<template>
  <TransitionGroup name="toast" tag="ul">
    <li
      v-for="(currentAlert, index) in displayAlert"
      :key="index"
      class="absolute bottom-4 right-4 z-50 flex min-w-[440px] flex-row items-center justify-between gap-4 rounded-xl bg-stone-200 px-4 py-2 text-stone-900"
    >
      {{ currentAlert }}
      <button class="py-2 text-blue-600 transition-colors hover:text-blue-500">Refresh</button>
    </li>
  </TransitionGroup>
</template>

<style scoped></style>
