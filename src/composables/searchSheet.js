import { ref } from 'vue'
import { debounce } from '@/assets/scripts/debounce'

let controller
const sheets = ref([])
const loading = ref(false)

export function useSearch(searchValue, category, musicKey) {
  async function onFetch() {
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
  }

  onFetch()

  return { sheets, loading }
}
