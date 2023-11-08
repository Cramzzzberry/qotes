import { reactive } from 'vue'

export const toasts = reactive({
  list: []
})

export function useToast() {
  function addToast(msg) {
    toasts.list.push(msg)
  }

  return { addToast }
}
