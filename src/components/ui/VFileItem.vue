<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  songTitle: String,
  songWritter: String,
  url: String,
  musicKey: String
})

const menu = ref(null)
const dropdownPosition = ref('top-end') //used top-end so that the initial scrollable div will not change height

onMounted(() => {
  if (menu.value.getBoundingClientRect().top > window.innerHeight - 225) {
    dropdownPosition.value = 'top-end'
  } else {
    dropdownPosition.value = 'bottom-end'
  }
})
</script>

<template>
  <router-link
    :to="url"
    class="inline-grid h-fit cursor-pointer items-center gap-1 rounded-xl p-2 transition-colors duration-100 ease-in-out hover:bg-stone-800"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-md bg-emerald-400 text-3xl font-semibold text-emerald-900"
    >
      {{ musicKey }}
    </div>
    <div class="px-2 py-0">
      <div class="flex w-full flex-col">
        <span class="text-lg font-medium leading-none">{{ songTitle }}</span>
        <span class="text-sm text-stone-400">{{ songWritter }}</span>
      </div>
    </div>
    <VDropdownList :position="dropdownPosition">
      <template #button>
        <button
          @click.stop.prevent
          class="flex items-center justify-center rounded-lg p-3 transition-colors hover:bg-stone-700"
          ref="menu"
        >
          <span class="material-icons text-stone-400"> more_vert </span>
        </button>
      </template>
      <template #dropdown-content>
        <ul @click.stop.prevent class="flex flex-col gap-1 whitespace-nowrap">
          <li>
            <VButton btnType="ghost" class="w-full">
              <span class="material-icons"> done </span>
              <span class="ml-2 text-left">Select</span>
            </VButton>
          </li>
          <li>
            <VButton btnType="ghost" class="w-full">
              <span class="material-icons"> push_pin </span>
              <span class="ml-2 text-left">Pin</span>
            </VButton>
          </li>
          <li>
            <VButton btnType="ghost" class="w-full">
              <span class="material-icons"> lightbulb </span>
              <span class="ml-2 text-left">Put to Important</span>
            </VButton>
          </li>
          <li>
            <VButton btnType="ghost" class="w-full">
              <span class="material-icons"> delete </span>
              <span class="ml-2 text-left">Delete</span>
            </VButton>
          </li>
        </ul>
      </template>
    </VDropdownList>
  </router-link>
</template>

<style scoped>
a {
  grid-template-columns: max-content auto max-content;
}
</style>
