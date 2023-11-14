import { ref, watch, onMounted, toValue } from 'vue'
import { refreshStore } from '@/store'
import { scrollStore } from '@/store'
import { selectionStore } from '@/store'
import { debounce } from '@/assets/scripts/debounce'

export function useFetchSheets(searchInput, tab, sheetKey) {
  let fetchPreferences = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let controller
  const lastSheetId = ref('')
  const prevSheetList = ref([])
  const searchResults = ref([])
  const isLoading = ref(false)

  const search = debounce(() => {
    if (toValue(searchInput) !== '') {
      const delayFunc = async () => {
        if (controller) {
          controller.abort()
        }

        controller = new AbortController()
        const signal = controller.signal

        await fetch(`http://localhost:3000/sheets/search/${tab}/${toValue(sheetKey).toLowerCase().replace(' ', '-')}/${toValue(searchInput)}`, {
          body: JSON.stringify({
            last_id: null
          }),
          signal,
          ...fetchPreferences
        })
          .then(async (res) => {
            searchResults.value = await res.json()

            if (searchResults.value.length !== 0) {
              lastSheetId.value = searchResults.value[searchResults.value.length - 1].id
            }
            prevSheetList.value = searchResults.value
            isLoading.value = false
          })
          .catch((err) => console.log(err))
      }

      delayFunc()
    } else {
      const delayFunc = async () => {
        if (controller) {
          controller.abort()
        }

        controller = new AbortController()
        const signal = controller.signal

        await fetch(`http://localhost:3000/sheets/get/${tab}/${toValue(sheetKey).toLowerCase().replace(' ', '-')}`, {
          body: JSON.stringify({
            last_id: null
          }),
          signal,
          ...fetchPreferences
        })
          .then(async (res) => {
            searchResults.value = await res.json()

            if (searchResults.value.length !== 0) {
              lastSheetId.value = searchResults.value[searchResults.value.length - 1].id
            }
            prevSheetList.value = searchResults.value
            isLoading.value = false
          })
          .catch((err) => console.log(err))
      }

      delayFunc()
    }
  })

  const addMore = () => {
    if (prevSheetList.value.length === 39 || prevSheetList.value.length === 0) {
      if (toValue(searchInput) !== '') {
        const onFetch = async () => {
          await fetch(`http://localhost:3000/sheets/search/${tab}/${toValue(sheetKey).toLowerCase().replace(' ', '-')}/${toValue(searchInput)}`, {
            ...fetchPreferences,
            body: JSON.stringify({
              last_id: lastSheetId.value
            })
          })
            .then(async (res) => {
              let moreSheets = await res.json()
              searchResults.value.push(...moreSheets)

              if (moreSheets.length !== 0) {
                lastSheetId.value = moreSheets[moreSheets.length - 1].id
              }
            })
            .catch((err) => console.log(err))
        }

        onFetch()
      } else {
        const onFetch = async () => {
          await fetch(`http://localhost:3000/sheets/get/${tab}/${toValue(sheetKey).toLowerCase().replace(' ', '-')}`, {
            ...fetchPreferences,
            body: JSON.stringify({
              last_id: lastSheetId.value
            })
          })
            .then(async (res) => {
              let moreSheets = await res.json()
              searchResults.value.push(...moreSheets)

              if (moreSheets.length !== 0) {
                lastSheetId.value = moreSheets[moreSheets.length - 1].id
              }
            })
            .catch((err) => console.log(err))
        }

        onFetch()
      }
    }
  }

  //input checking
  watch(
    () => [toValue(searchInput), toValue(sheetKey), toValue(refreshStore)],
    () => {
      selectionStore.list = []
      isLoading.value = true
      search()
    },
    { immediate: true }
  )

  //scroll checking
  onMounted(() => {
    let ticking = false
    scrollStore.value.addEventListener('scroll', () => {
      if (Math.abs(scrollStore.value.scrollHeight - scrollStore.value.clientHeight - scrollStore.value.scrollTop) < 1 && !ticking) {
        window.requestAnimationFrame(async () => {
          addMore()
          ticking = false
        })
        ticking = true
      }
    })
  })

  return { searchResults, isLoading }
}
