import { ref } from 'vue'
import { useToast } from '@/composables/toast'
import { useRefreshSheetList } from '@/composables/refreshSheetList'
import { socket } from '@/socket'

const hasSelection = ref(false)
const noOfSelected = ref(0)
const selectedData = ref([])

export function useSelectedSheets() {
  const toast = useToast()
  const refreshSheetList = useRefreshSheetList()

  function getSelectedData(data) {
    const _dataId = data.map((datum) => {
      return datum.split('===')[0]
    })

    const _dataPinStates = data.map((datum) => {
      return datum.split('===')[1]
    })

    const _dataImportantStates = data.map((datum) => {
      return datum.split('===')[2]
    })

    selectedData.value = {
      ids: _dataId,
      pinStates: _dataPinStates,
      importantStates: _dataImportantStates
    }

    hasSelection.value = data.length > 0 ? true : false
    noOfSelected.value = data.length
  }

  function pinSheets(willBePinned) {
    socket.emit('update sheets', {
      data: {
        pinned: willBePinned ? true : false
      },
      ...selectedData.value
    })

    refreshSheetList.refresh()
    toast.addToast({
      msg: 'List updated.',
      duration: 4000
    })
  }

  function importantSheets(willBeImportant) {
    socket.emit('update sheets', {
      data: {
        important: willBeImportant ? true : false
      },
      ...selectedData.value
    })

    refreshSheetList.refresh()
    toast.addToast({
      msg: 'List updated.',
      duration: 4000
    })
  }

  function deleteSheets() {
    socket.emit('delete sheets', selectedData.value)

    refreshSheetList.refresh()
    toast.addToast({
      msg: noOfSelected.value > 1 ? `${noOfSelected.value} sheets deleted successfully.` : 'Sheet deleted successfully.',
      duration: 4000
    })
  }

  return { selectedData, hasSelection, noOfSelected, getSelectedData, pinSheets, importantSheets, deleteSheets }
}
