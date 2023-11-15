import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toasts } from '@/composables/toast'
import { changeKey } from '@/assets/scripts/change-key'
import parseSheet from '@/assets/scripts/parse-sheet'
import sanitizeHtml from 'sanitize-html'

export function useEditSheet() {
  const route = useRoute()

  const songTitle = ref('')
  const artist = ref('')
  const sheetKey = ref('')
  const sheetContent = ref('')
  const isLoading = ref(true)

  onMounted(async () => {
    await fetch(`http://localhost:3000/sheets/get/sheet/${route.params.id}`).then(async (res) => {
      const response = await res.json()

      songTitle.value = response.song_title
      artist.value = response.artist
      sheetKey.value = response.song_key
      sheetContent.value = response.content
      isLoading.value = false

      //transposition watch
      watch(sheetKey, (newKey, oldKey) => {
        sheetContent.value = changeKey(sheetContent.value, newKey, oldKey)
      })
    })
  })

  const save = () => {
    const onSave = async () => {
      await fetch(`http://localhost:3000/sheets/update-sheet/${route.params.id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          song_title: songTitle.value,
          artist: artist.value,
          song_key: sheetKey.value,
          content: sheetContent.value
        })
      })
        .then(() => {
          toasts.add({
            msg: 'Sheet saved successfully.',
            duration: 4000
          })
        })
        .catch((err) => console.log(err))
    }

    onSave()
  }

  const sheetContentHtml = computed(() => {
    return sanitizeHtml(parseSheet(sheetContent.value), {
      allowedAttributes: false
    })
  })

  return { songTitle, artist, sheetKey, sheetContent, isLoading, sheetContentHtml, save }
}
