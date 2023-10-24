import { toValue } from 'vue'

async function createSheet(form) {
  const formdata = new FormData(toValue(form))
  const formObj = {}

  formdata.forEach((value, key) => {
    if (value === 'on') {
      formObj[key] = true
    } else {
      formObj[key] = value
    }
  })

  formObj[
    'content'
  ] = `# ${formObj.song_title} \n## ${formObj.song_writer} Key of ${formObj.song_key} \n---\nC   G   Am   F\nSample Lyrics`

  await fetch('http://localhost:3000/sheets/create-sheet', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  })
    .then(() => {
      console.log('Sheet creattion success')
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
}

export { createSheet }
