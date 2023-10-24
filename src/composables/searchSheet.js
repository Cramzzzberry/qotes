import { ref } from 'vue'

export function useSearch(searchValue, searchBoxId, filter) {
  const sheets = ref([])
  const loading = ref(false)

  if (searchValue !== '') {
    let input = document.getElementById(searchBoxId)
    loading.value = true

    input.addEventListener('keyup', () => {
      clearTimeout(input._timer) //reset timer

      sheets.value = [] //reset sheets

      input._timer = setTimeout(async () => {
        await fetch(`http://localhost:3000/sheets/get/${filter}/${searchValue}`)
          .then(async (res) => {
            sheets.value = await res.json()
            loading.value = false
          })
          .catch((err) => console.log(err))
      }, 500)
    })
  }

  return { sheets, loading }
}
