import { ref } from 'vue'

export const refreshToggle = ref(false)

export function useRefreshSheetList() {
  function refresh() {
    refreshToggle.value = !refreshToggle.value
  }

  return { refresh }
}
