<script setup>
import { ref, watch } from 'vue'
import { toasts } from '@/composables/toast'

/*Toast section*/
const displayAlert = ref([])
let timeout = null

watch(
  () => toasts.list,
  () => {
    if (toasts.list.length >= 1 && timeout === null) {
      setTimeout(() => {
        displayAlert.value.push(toasts.list[0].msg)
      }, 150)

      timeout = setTimeout(() => {
        toasts.list.shift()
        displayAlert.value.shift()
        timeout = null
      }, toasts.list[0].duration)
    }
  },
  { deep: true }
)

function reload() {
  window.location.reload()
}
</script>

<template>
  <TransitionGroup name="toast-fade-scale" tag="ul">
    <li
      v-for="(currentAlert, index) in displayAlert"
      :key="index"
      class="absolute bottom-4 right-4 z-50 flex min-w-[440px] flex-row items-center justify-between gap-4 rounded-xl bg-stone-200 p-4 font-medium text-stone-900"
    >
      {{ currentAlert }}
      <button v-if="toasts.list[0].showAction" @click="reload()" class="h-full text-blue-600 transition-colors hover:text-blue-500">Refresh</button>
    </li>
  </TransitionGroup>
</template>

<style scoped></style>
