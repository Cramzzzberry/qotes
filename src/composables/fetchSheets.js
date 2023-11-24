import { ref, watch, onMounted, toValue } from 'vue'
import { refreshStore } from '@/store'
import { scrollStore } from '@/store'
import { selectionStore } from '@/store'
import { debounce } from '@/assets/scripts/debounce'

export function useFetchSheets(searchInput, tag, sheetKey) {
  const prevSheetList = ref([])
  const searchResults = ref([])
  const lastSheetId = ref('')
  const isLoading = ref(false)
  const showLoadMore = ref(false)
  let fetchPreferences = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let controller

  const search = debounce(() => {
    if (toValue(searchInput) !== '') {
      const onFetch = async () => {
        if (controller) {
          controller.abort()
        }

        controller = new AbortController()
        const signal = controller.signal

        await fetch(`${import.meta.env.VITE_API_DOMAIN}/sheets/search/`, {
          body: JSON.stringify({
            last_id: null,
            key: toValue(sheetKey),
            tag: tag,
            searchInput: toValue(searchInput)
          }),
          signal,
          ...fetchPreferences
        })
          .then(async (res) => {
            searchResults.value = await res.json()

            if (searchResults.value.length !== 0) {
              lastSheetId.value = searchResults.value[searchResults.value.length - 1].id
            }

            if (searchResults.value.length < 39) {
              showLoadMore.value = false
            } else {
              showLoadMore.value = true
            }

            prevSheetList.value = searchResults.value
            isLoading.value = false
          })
          .catch((err) => console.log(err))
      }

      onFetch()
    } else {
      const onFetch = async () => {
        if (controller) {
          controller.abort()
        }

        controller = new AbortController()
        const signal = controller.signal

        await fetch(`${import.meta.env.VITE_API_DOMAIN}/sheets/get/sheets`, {
          body: JSON.stringify({
            last_id: null,
            key: toValue(sheetKey),
            tag: tag,
            searchInput: toValue(searchInput)
          }),
          signal,
          ...fetchPreferences
        })
          .then(async (res) => {
            searchResults.value = await res.json()

            if (searchResults.value.length !== 0) {
              lastSheetId.value = searchResults.value[searchResults.value.length - 1].id
            }

            if (searchResults.value.length < 39) {
              showLoadMore.value = false
            } else {
              showLoadMore.value = true
            }

            prevSheetList.value = searchResults.value
            isLoading.value = false
          })
          .catch((err) => console.log(err))
      }

      onFetch()
    }
  })

  const addMore = () => {
    if (prevSheetList.value.length === 39 || prevSheetList.value.length === 0) {
      if (toValue(searchInput) !== '') {
        const onFetch = async () => {
          await fetch(`${import.meta.env.VITE_API_DOMAIN}/sheets/search/`, {
            ...fetchPreferences,
            body: JSON.stringify({
              last_id: lastSheetId.value,
              key: toValue(sheetKey),
              tag: tag,
              searchInput: toValue(searchInput)
            })
          })
            .then(async (res) => {
              let moreSheets = await res.json()
              searchResults.value.push(...moreSheets)

              if (moreSheets.length !== 0) {
                lastSheetId.value = moreSheets[moreSheets.length - 1].id
              }

              if (moreSheets.length < 39) {
                showLoadMore.value = false
              } else {
                showLoadMore.value = true
              }
            })
            .catch((err) => console.log(err))
        }

        onFetch()
      } else {
        const onFetch = async () => {
          await fetch(`${import.meta.env.VITE_API_DOMAIN}/sheets/get/sheets`, {
            ...fetchPreferences,
            body: JSON.stringify({
              last_id: lastSheetId.value,
              key: toValue(sheetKey),
              tag: tag,
              searchInput: toValue(searchInput)
            })
          })
            .then(async (res) => {
              let moreSheets = await res.json()
              searchResults.value.push(...moreSheets)

              if (moreSheets.length !== 0) {
                lastSheetId.value = moreSheets[moreSheets.length - 1].id
              }

              if (moreSheets.length < 39) {
                showLoadMore.value = false
              } else {
                showLoadMore.value = true
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

  return { searchResults, isLoading, showLoadMore }
}
