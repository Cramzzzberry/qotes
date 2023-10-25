import { ref } from 'vue'

export function useSearch(searchValue, searchBoxId, category) {
  const sheets = ref([])
  const loading = ref(false)

  async function onFetch() {
    if (searchValue !== '') {
      let input = document.getElementById(searchBoxId)
      loading.value = true

      input.addEventListener('keyup', () => {
        clearTimeout(input._timer) //reset timer

        sheets.value = [] //reset sheets

        input._timer = setTimeout(async () => {
          await fetch(`http://localhost:3000/sheets/search/${category}/all-keys/${searchValue}`)
            .then(async (res) => {
              sheets.value = await res.json()
              loading.value = false
            })
            .catch((err) => console.log(err))
        }, 500)
      })
    } else {
      await fetch(`http://localhost:3000/sheets/get/${category}`)
        .then(async (res) => {
          sheets.value = await res.json()
          loading.value = false
        })
        .catch((err) => console.log(err))
    }
  }

  onFetch()

  return { sheets, loading }
}
