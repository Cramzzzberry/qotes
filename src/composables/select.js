import { ref } from 'vue'

const hasSelected = ref(false)
const noOfSelection = ref(0)

export function useSelect() {
  function setNoOfSelection(selectedData) {
    noOfSelection.value = selectedData.length
  }

  return { hasSelected, noOfSelection, setNoOfSelection }
}
