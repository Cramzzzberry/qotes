import { watch } from 'vue'
import { toastStore } from '@/store'
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

    const _dataLineupStates = selectionStore.list.map((datum) => {
      return datum.split('===')[1]
    })

    const _dataImportantStates = selectionStore.list.map((datum) => {
      return datum.split('===')[2]
    })

    selectionStore.organizedList = {
      ids: _dataId,
      lineupStates: _dataLineupStates,
      importantStates: _dataImportantStates
    }

    selectionStore.isFilled = selectionStore.list.length > 0 ? true : false
    selectionStore.length = selectionStore.list.length
  }

  const cancelSelection = () => {
    selectionStore.list = []
  }

  const lineup = (addToLineup) => {
    socket.emit('update sheets', {
      data: {
        lineup: addToLineup ? true : false
      },
      ...selectionStore.organizedList
    })

    refresh()
    toastStore.add({
      msg: 'List updated.',
      duration: 2000
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
    toastStore.add({
      msg: 'List updated.',
      duration: 2000
    })
  }

  const eraseSheets = () => {
    socket.emit('delete sheets', selectionStore.organizedList)

    refresh()
    toastStore.add({
      msg: selectionStore.length > 1 ? `${selectionStore.length} sheets deleted successfully.` : 'Sheet deleted successfully.',
      duration: 2000
    })
  }

  return { lineup, important, eraseSheets, cancelSelection }
}
