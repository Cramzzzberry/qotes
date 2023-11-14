import { reactive, watch } from 'vue'
import { toasts } from '@/composables/toast'
import { useRefreshSheetList } from '@/composables/refreshSheetList'
import { socket } from '@/socket'

export const selection = reactive({
  isFilled: false,
  length: 0,
  list: [],
  organizedList: []
})

export function useSelectedSheets() {
  const refreshSheetList = useRefreshSheetList()

  watch(
    () => selection.list,
    () => {
      setData()
    },
    { deep: true }
  )

  const setData = () => {
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

  const cancelSelection = () => {
    selection.list = []
  }

  const pin = (makeItPinned) => {
    socket.emit('update sheets', {
      data: {
        pinned: makeItPinned ? true : false
      },
      ...selection.organizedList
    })

    refreshSheetList.refresh()
    toasts.add({
      msg: 'List updated.',
      duration: 4000
    })
  }

  const important = (makeItImportant) => {
    socket.emit('update sheets', {
      data: {
        important: makeItImportant ? true : false
      },
      ...selection.organizedList
    })

    refreshSheetList.refresh()
    toasts.add({
      msg: 'List updated.',
      duration: 4000
    })
  }

  const erase = () => {
    socket.emit('delete sheets', selection.organizedList)

    refreshSheetList.refresh()
    toasts.add({
      msg: selection.length > 1 ? `${selection.length} sheets deleted successfully.` : 'Sheet deleted successfully.',
      duration: 4000
    })
  }

  return { pin, important, erase, cancelSelection }
}
