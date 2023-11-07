import { ref } from 'vue'

export const toasts = ref([])

export function useToast() {
  function addToast(msg) {
    toasts.value.push(msg)
  }

  return { addToast }
}
