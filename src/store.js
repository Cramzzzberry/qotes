import { reactive, ref } from 'vue'

export const selectionStore = reactive({
  isFilled: false,
  length: 0,
  list: [],
  organizedList: []
})

export const refreshStore = ref(false)

export const scrollStore = ref(null)
