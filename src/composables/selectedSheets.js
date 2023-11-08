import { reactive } from 'vue'
import { useToast } from '@/composables/toast'
import { useRefreshSheetList } from '@/composables/refreshSheetList'
import { socket } from '@/socket'

export const selection = reactive({
  isFilled: false,
  length: 0,
  list: [],
  organizedList: []
})

export function useSelectedSheets() {
  const toast = useToast()
  const refreshSheetList = useRefreshSheetList()

  function setSelectedData() {
    const _dataId = selection.list.map((datum) => {
      return datum.split('===')[0]
    })

    const _dataPinStates = selection.list.map((datum) => {
      return datum.split('===')[1]
    })

    const _dataImportantStates = selection.list.map((datum) => {
      return datum.split('===')[2]
    })

    selection.organizedList = {
      ids: _dataId,
      pinStates: _dataPinStates,
      importantStates: _dataImportantStates
    }

    selection.isFilled = selection.list.length > 0 ? true : false
    selection.length = selection.list.length
  }

  function pinSheets(makeItPinned) {
    socket.emit('update sheets', {
      data: {
        pinned: makeItPinned ? true : false
      },
      ...selection.organizedList
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
      ...selection.organizedList
    })

    refreshSheetList.refresh()
    toast.addToast({
      msg: 'List updated.',
      duration: 4000
    })
  }

  function deleteSheets() {
    socket.emit('delete sheets', selection.organizedList)

    refreshSheetList.refresh()
    toast.addToast({
      msg: selection.length > 1 ? `${selection.length} sheets deleted successfully.` : 'Sheet deleted successfully.',
      duration: 4000
    })
  }

  return { setSelectedData, pinSheets, importantSheets, deleteSheets }
}
