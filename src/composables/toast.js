import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
  function addToast(msg) {
    toasts.value.push(msg)
  }

  return { toasts, addToast }
}
