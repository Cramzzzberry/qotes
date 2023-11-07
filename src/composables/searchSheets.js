// what this does is that if the searchbar at the Topbar is an empty string, return a full list of sheets
// else, fetch based on search input. the searchbar on mounted is typically empty, so what I did is that
// rather than use onMounted to fetch full list initially, I fetch it based on searchbar value

import { ref } from 'vue'
import { debounce } from '@/assets/scripts/debounce'

export function useSearch(searchValue, category, musicKey) {
  const sheets = ref([])
  const loading = ref(false)
  let controller

  function onSearch() {
    if (searchValue !== '') {
      loading.value = true

      const delayFunc = debounce(async () => {
        if (controller) {
          controller.abort()
        }

        controller = new AbortController()
        const signal = controller.signal

        await fetch(`http://localhost:3000/sheets/search/${category}/${musicKey.toLowerCase().replace(' ', '-')}/${searchValue}`, { signal })
          .then(async (res) => {
            sheets.value = await res.json()
            loading.value = false
          })
          .catch((err) => console.log(err))
      })

      delayFunc()
    } else {
      loading.value = true

      const delayFunc = debounce(async () => {
        if (controller) {
          controller.abort()
        }

        controller = new AbortController()
        const signal = controller.signal

        await fetch(`http://localhost:3000/sheets/get/${category}/${musicKey.toLowerCase().replace(' ', '-')}`, { signal })
          .then(async (res) => {
            sheets.value = await res.json()
            loading.value = false
          })
          .catch((err) => console.log(err))
      })

      delayFunc()
    }

    return
  }

  onSearch()

  return { sheets: sheets, loadState: loading }
}
