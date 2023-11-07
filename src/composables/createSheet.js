import { toValue } from 'vue'
import { useToast } from '@/composables/toast'
import { useRefreshSheetList } from '@/composables/refreshSheetList'
import { socket } from '@/socket'

export async function useCreateSheet(form) {
  const formdata = new FormData(toValue(form))
  const formValues = {}
  const toast = useToast()
  const refreshSheetList = useRefreshSheetList()

  formdata.forEach((value, key) => {
    if (value === 'pinned' || value === 'important') {
      formValues[key] = true
    } else {
      formValues[key] = value
    }
  })

  formValues['content'] = `# ${formValues.song_title} \n## ${formValues.song_writer} Key of ${formValues.song_key} \n---\nC   G   Am   F\nSample Lyrics`

  socket.emit('create sheet', formValues)
  toast.addToast({
    msg: 'Sheet created successfully.',
    duration: 4000
  })
  refreshSheetList.refresh()
}
