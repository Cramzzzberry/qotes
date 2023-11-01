import { ref } from 'vue'

const hasSelection = ref(false)
const noOfSelected = ref(0)
const selectedData = ref([])

export function useSelectedSheets() {
  function getSelectedData(data) {
    selectedData.value = {
      id: data
    }
    hasSelection.value = data.length > 0 ? true : false
    noOfSelected.value = data.length
  }

  function deleteSelectedSheets() {
    async function onDelete() {
      await fetch('http://localhost:3000/sheets/delete-sheets', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedData.value)
      })
        .then(() => console.log('Deleted Successfully'))
        .catch((err) => console.log(err))

      window.location.reload()
    }

    onDelete()
  }

  return { hasSelection, noOfSelected, getSelectedData, deleteSelectedSheets }
}
