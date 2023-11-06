import { ref } from 'vue'

const hasSelection = ref(false)
const noOfSelected = ref(0)
const selectedData = ref([])

export function useSelectedSheets() {
  function getSelectedData(data) {
    selectedData.value = {
      ids: data
    }
    hasSelection.value = data.length > 0 ? true : false
    noOfSelected.value = data.length
  }

  function pinSheets(willBePinned) {
    async function onUpdate() {
      await fetch('http://localhost:3000/sheets/update-sheets', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            pinned: willBePinned ? true : false
          },
          ...selectedData.value
        })
      })
        .then(() => console.log('Deleted Successfully'))
        .catch((err) => console.log(err))

      window.location.reload()
    }

    onUpdate()
  }

  function importantSheets(willBeImportant) {
    async function onUpdate() {
      await fetch('http://localhost:3000/sheets/update-sheets', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            important: willBeImportant ? true : false
          },
          ...selectedData.value
        })
      })
        .then(() => console.log('Deleted Successfully'))
        .catch((err) => console.log(err))

      window.location.reload()
    }

    onUpdate()
  }

  function deleteSheets() {
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

  return { hasSelection, noOfSelected, getSelectedData, pinSheets, importantSheets, deleteSheets }
}
