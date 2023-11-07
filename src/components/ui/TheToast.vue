<script setup>
import { ref, watch } from 'vue'
import { toasts } from '@/composables/toast'

const displayAlert = ref([])
let timeout = null

//This will kickstart when there is a new alert
//weird because i need to use .value to make it update, i think its because i use the toasts.value inside watch
watch(toasts.value, () => {
  if (toasts.value.length >= 1 && timeout === null) {
    setTimeout(() => {
      displayAlert.value.push(toasts.value[0].msg)
    }, 150)

    timeout = setTimeout(() => {
      toasts.value.shift()
      displayAlert.value.shift()
      timeout = null
    }, toasts.value[0].duration)
  }
})

function reload() {
  window.location.reload()
}
</script>

<template>
  <TransitionGroup name="toast" tag="ul">
    <li
      v-for="(currentAlert, index) in displayAlert"
      :key="index"
      class="absolute bottom-4 right-4 z-50 flex min-w-[440px] flex-row items-center justify-between gap-4 rounded-xl bg-stone-200 p-4 text-stone-900"
    >
      {{ currentAlert }}
      <button v-if="toasts[0].showAction" @click="reload()" class="h-full text-blue-600 transition-colors hover:text-blue-500">Refresh</button>
    </li>
  </TransitionGroup>
</template>

<style scoped></style>
