import { ref } from 'vue'
import { useToast } from '@/composables/toast'
import { useRefreshSheetList } from '@/composables/refreshSheetList'
import { socket } from '@/socket'

export const hasSelection = ref(false)
export const noOfSelected = ref(0)
export const selectedData = ref([])
export const organizedSelData = ref([])

export function useSelectedSheets() {
  const toast = useToast()
  const refreshSheetList = useRefreshSheetList()

  function getSelectedData() {
    const _dataId = selectedData.value.map((datum) => {
      return datum.split('===')[0]
    })

    const _dataPinStates = selectedData.value.map((datum) => {
      return datum.split('===')[1]
    })

    const _dataImportantStates = selectedData.value.map((datum) => {
      return datum.split('===')[2]
    })

    organizedSelData.value = {
      ids: _dataId,
      pinStates: _dataPinStates,
      importantStates: _dataImportantStates
    }

    hasSelection.value = selectedData.value.length > 0 ? true : false
    noOfSelected.value = selectedData.value.length
  }

  function pinSheets(makeItPinned) {
    socket.emit('update sheets', {
      data: {
        pinned: makeItPinned ? true : false
      },
      ...organizedSelData.value
    })

    refreshSheetList.refresh()
    toast.addToast({
      msg: 'List updated.',
      duration: 4000
    })
  }

  function importantSheets(makeItImportant) {
    socket.emit('update sheets', {
      data: {
        important: makeItImportant ? true : false
      },
      ...organizedSelData.value
    })

    refreshSheetList.refresh()
    toast.addToast({
      msg: 'List updated.',
      duration: 4000
    })
  }

  function deleteSheets() {
    socket.emit('delete sheets', organizedSelData.value)

    refreshSheetList.refresh()
    toast.addToast({
      msg: noOfSelected.value > 1 ? `${noOfSelected.value} sheets deleted successfully.` : 'Sheet deleted successfully.',
      duration: 4000
    })
  }

  return { getSelectedData, pinSheets, importantSheets, deleteSheets }
}
