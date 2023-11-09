import { reactive } from 'vue'

export const toasts = reactive({
  list: [],
  add(msg) {
    this.list.push(msg)
  }
})
