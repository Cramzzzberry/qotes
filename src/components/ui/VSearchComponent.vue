<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  searchValue: String,
  searchBoxId: String,
  filter: String
})

const sheets = ref([])
const loading = ref(false)

watchEffect(() => {
  if (props.searchValue !== '') {
    let input = document.getElementById(props.searchBoxId)
    loading.value = true

    input.addEventListener('keyup', () => {
      clearTimeout(input._timer) //reset timer

      sheets.value = [] //reset sheets

      input._timer = setTimeout(async () => {
        await getRequestedSheets(props.searchValue)
      }, 500)
    })
  }
})

async function getRequestedSheets(sheetName) {
  await fetch(`http://localhost:3000/sheets/get/${props.filter}/${sheetName}`)
    .then(async (res) => {
      sheets.value = await res.json()
      loading.value = false
    })
    .catch((err) => console.log(err))
}
</script>

<template>
  <!-- if the searchbox is blank -->
  <ul
    v-if="props.searchValue === '' && !loading"
    tabindex="0"
    class="invisible absolute top-[calc(100%+1rem)] h-fit w-full scale-[98%] rounded-lg bg-stone-700 opacity-0 transition-all group-focus-within/search:visible group-focus-within/search:scale-100 group-focus-within/search:opacity-100"
  >
    <li class="flex items-center justify-center p-4">Search a sheet</li>
  </ul>

  <!-- if fetching is pending -->
  <ul
    v-else-if="loading"
    tabindex="0"
    class="invisible absolute top-[calc(100%+1rem)] h-fit w-full scale-[98%] rounded-lg bg-stone-700 opacity-0 transition-all group-focus-within/search:visible group-focus-within/search:scale-100 group-focus-within/search:opacity-100"
  >
    <li class="flex items-center justify-center p-4">Loading...</li>
  </ul>

  <!-- if there are no sheets -->
  <ul
    v-else-if="sheets.length === 0 && !loading"
    tabindex="0"
    class="invisible absolute top-[calc(100%+1rem)] h-fit w-full scale-[98%] rounded-lg bg-stone-700 opacity-0 transition-all group-focus-within/search:visible group-focus-within/search:scale-100 group-focus-within/search:opacity-100"
  >
    <li class="flex items-center justify-center p-4">No Results</li>
  </ul>

  <!-- If there are -->
  <ul
    v-else
    tabindex="0"
    class="invisible absolute top-[calc(100%+1rem)] h-fit w-full scale-[98%] rounded-lg bg-stone-700 opacity-0 transition-all group-focus-within/search:visible group-focus-within/search:scale-100 group-focus-within/search:opacity-100"
  >
    <!-- with search results -->
    <li v-for="sheet in sheets" :key="sheet.id">
      <router-link
        :to="`/edit/${sheet.id}`"
        class="inline-grid h-fit w-full cursor-pointer items-center gap-1 rounded-lg p-2 transition-colors hover:bg-stone-600"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-400 text-2xl font-semibold text-emerald-900"
        >
          {{ sheet.song_key }}
        </div>
        <div class="px-2 py-0">
          <div class="flex w-full flex-col">
            <span class="text-lg font-medium leading-none">{{ sheet.song_title }}</span>
            <span class="text-sm text-stone-400">{{ sheet.song_writer }}</span>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
a {
  grid-template-columns: max-content auto max-content;
}
</style>
