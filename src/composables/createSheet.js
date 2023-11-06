import { toValue } from 'vue'
import { socket } from '@/socket'

export async function useCreateSheet(form) {
  const formdata = new FormData(toValue(form))
  const formValues = {}

  formdata.forEach((value, key) => {
    if (value === 'pinned' || value === 'important') {
      formValues[key] = true
    } else {
      formValues[key] = value
    }
  })

  formValues['content'] = `# ${formValues.song_title} \n## ${formValues.song_writer} Key of ${formValues.song_key} \n---\nC   G   Am   F\nSample Lyrics`

  socket.emit('create sheet', formValues)
  window.location.reload()
}
