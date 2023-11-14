import { toValue } from 'vue'
import { toasts } from '@/composables/toast'
import { useRefresh } from '@/composables/refresh'
import { socket } from '@/socket'

export function useCreateSheet(form) {
  const { refresh } = useRefresh()

  const create = () => {
    const formdata = new FormData(toValue(form))
    const formValues = {}
    formdata.forEach((value, key) => {
      if (value === 'pinned' || value === 'important') {
        formValues[key] = true
      } else {
        formValues[key] = value
      }
    })

    formValues[
      'content'
    ] = `# ${formValues.song_title} \n## ${formValues.song_writer} Key of ${formValues.song_key} \n---\nC D E F G A B\nType Anything Here`

    socket.emit('create sheet', formValues)
    toasts.add({
      msg: 'Sheet created successfully.',
      duration: 4000
    })

    refresh()
  }

  return { create }
}
