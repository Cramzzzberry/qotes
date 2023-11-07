import { ref } from 'vue'
const refreshToggle = ref(false)

export function useRefreshSheetList() {
  function refresh() {
    refreshToggle.value = !refreshToggle.value
  }

  return { refreshToggle, refresh }
}
