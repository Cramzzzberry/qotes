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
