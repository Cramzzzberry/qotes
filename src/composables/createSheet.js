import { toValue } from 'vue'

export async function useCreateSheet(form) {
  const formdata = new FormData(toValue(form))
  const formValues = {}

  formdata.forEach((value, key) => {
    if (value === 'on') {
      formValues[key] = true
    } else {
      formValues[key] = value
    }
  })

  formValues[
    'content'
  ] = `# ${formValues.song_title} \n## ${formValues.song_writer} Key of ${formValues.song_key} \n---\nC   G   Am   F\nSample Lyrics`

  await fetch('http://localhost:3000/sheets/create-sheet', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formValues)
  })
    .then(() => {
      console.log('Sheet creattion success')
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
}
