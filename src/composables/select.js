import { watch } from 'vue'
import { toasts } from '@/composables/toast'
import { useRefresh } from '@/composables/refresh'
import { selectionStore } from '@/store'
import { socket } from '@/socket'

export function useSelect() {
  const { refresh } = useRefresh()

  watch(
    () => selectionStore.list,
    () => {
      setData()
    },
    { deep: true }
  )

  const setData = () => {
    const _dataId = selectionStore.list.map((datum) => {
      return datum.split('===')[0]
    })

    const _dataPinStates = selectionStore.list.map((datum) => {
      return datum.split('===')[1]
    })

    const _dataImportantStates = selectionStore.list.map((datum) => {
      return datum.split('===')[2]
    })

    selectionStore.organizedList = {
      ids: _dataId,
      pinStates: _dataPinStates,
      importantStates: _dataImportantStates
    }

    selectionStore.isFilled = selectionStore.list.length > 0 ? true : false
    selectionStore.length = selectionStore.list.length
  }

  const cancelSelection = () => {
    selectionStore.list = []
  }

  const pin = (makeItPinned) => {
    socket.emit('update sheets', {
      data: {
        pinned: makeItPinned ? true : false
      },
      ...selectionStore.organizedList
    })

    refresh()
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
      ...selectionStore.organizedList
    })

    refresh()
    toasts.add({
      msg: 'List updated.',
      duration: 4000
    })
  }

  const erase = () => {
    socket.emit('delete sheets', selectionStore.organizedList)

    refresh()
    toasts.add({
      msg: selectionStore.length > 1 ? `${selectionStore.length} sheets deleted successfully.` : 'Sheet deleted successfully.',
      duration: 4000
    })
  }

  return { pin, important, erase, cancelSelection }
}
