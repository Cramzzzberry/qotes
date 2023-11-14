import { refreshStore } from '@/store'

export function useRefresh() {
  function refresh() {
    refreshStore.value = !refreshStore.value
  }

  return { refresh }
}
