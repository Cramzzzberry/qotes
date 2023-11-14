import { ref, toValue } from 'vue'

export const scrollableComp = ref(null)

export function useScroll() {
  function putComponent(component) {
    scrollableComp.value = toValue(component)
  }
  return { putComponent }
}
