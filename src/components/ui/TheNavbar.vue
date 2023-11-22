<script setup>
import { ref, reactive } from 'vue'
import { useCreateSheet } from '@/composables/createSheet'
import { selectionStore } from '@/store'
import { setKeys } from '@/assets/scripts/change-key'

/* Page controller section */
const page = reactive({
  index: 0,
  set(number = 0) {
    this.index = number
  }
})

// /* Sheet creation section */
const createSheet = reactive({
  keys: setKeys,
  selectedKey: 'C',
  category: [],
  modalState: false,
  toggleModal() {
    this.modalState = !this.modalState
  }
})

const createSheetForm = ref(null)
const { create } = useCreateSheet(createSheetForm)
</script>

<template>
  <div class="flex h-screen flex-row font-medium on-md:flex-col-reverse">
    <!-- the sidebar wrapper -->
    <div class="flex shrink-0 flex-col items-center justify-between overflow-hidden overflow-x-hidden bg-stone-200 px-3 py-6 on-md:flex-row on-md:p-4">
      <div class="flex flex-col items-center on-md:w-full on-md:flex-row on-md:justify-around">
        <button
          @click="createSheet.toggleModal()"
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-900 transition-colors hover:bg-emerald-500 on-md:absolute on-md:bottom-24 on-md:right-6 on-md:z-10 on-md:h-16 on-md:w-16"
        >
          <span class="material-icons text-3xl leading-none"> add </span>
        </button>

        <div class="mt-16 flex flex-col items-center gap-4 on-md:mt-0 on-md:w-full on-md:flex-row on-md:justify-around">
          <button @click="page.set(0)" :disabled="selectionStore.isFilled" :class="[page.index === 0 ? 'active' : '']" class="nav-points">
            <span class="material-icons on-md:text-xl"> description </span>
            <span>All</span>
          </button>
          <button @click="page.set(1)" :disabled="selectionStore.isFilled" :class="[page.index === 1 ? 'active' : '']" class="nav-points">
            <span class="material-icons on-md:text-xl"> push_pin </span>
            <span>Pinned</span>
          </button>
          <button @click="page.set(2)" :disabled="selectionStore.isFilled" :class="[page.index === 2 ? 'active' : '']" class="nav-points">
            <span class="material-icons on-md:text-xl"> lightbulb </span>
            <span>Important</span>
          </button>
        </div>
      </div>
    </div>

    <!-- content slot -->
    <slot :index="page.index" />

    <!-- create sheet modal -->
    <VModal :state="createSheet.modalState">
      <div class="flex flex-row items-center justify-between">
        <h2>Create new sheet</h2>

        <!-- close button -->
        <VButton @click="createSheet.toggleModal()" variant="ghost icon" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <form @submit.prevent="create()" class="flex flex-col gap-2" ref="createSheetForm">
        <div class="flex flex-col items-center gap-2">
          <VInput label="Song Title" color="primary" type="text" name="song_title" wide required />
          <VInput label="Artist" color="primary" type="text" name="artist" wide required />
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-stone-600">Key</span>
          <ul class="grid grid-cols-4 gap-1 rounded-lg border border-stone-400 p-2 on-md:grid-cols-3">
            <li v-for="key in createSheet.keys" :key="key" class="w-full">
              <input
                type="radio"
                name="song_key"
                :id="key + ' id'"
                :checked="createSheet.selectedKey === key"
                :value="key"
                v-model="createSheet.selectedKey"
                class="peer absolute -top-10 hidden"
              />
              <label
                :for="key + ' id'"
                tabindex="0"
                class="block w-full cursor-pointer whitespace-nowrap rounded-md bg-transparent px-4 py-2 transition-colors duration-100 ease-in-out hover:bg-stone-200 peer-checked:bg-emerald-400 peer-checked:text-emerald-900"
              >
                {{ key }}
              </label>
            </li>
          </ul>
        </div>

        <div class="flex gap-2 text-stone-600">
          <!-- pinned checkbox -->
          <input type="checkbox" class="invisible absolute -top-10" v-model="createSheet.category" value="pinned" name="pinned" id="pinned" />
          <label for="pinned" class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-stone-200">
            <span v-if="!createSheet.category.includes('pinned')" class="material-icons select-none"> check_box_outline_blank </span>
            <span v-else class="material-icons select-none"> check_box </span>
            <span class="pl-2">Pinned</span>
          </label>

          <!-- important checkbox -->
          <input type="checkbox" class="invisible absolute -top-10" v-model="createSheet.category" value="important" name="important" id="important" />
          <label for="important" class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-stone-200">
            <span v-if="!createSheet.category.includes('important')" class="material-icons select-none"> check_box_outline_blank </span>
            <span v-else class="material-icons select-none"> check_box </span>
            <span class="pl-2">Important</span>
          </label>
        </div>

        <!-- create button -->
        <VButton color="primary" type="submit" class="justify-center"> Create </VButton>
      </form>
    </VModal>
  </div>
</template>

<style scoped>
.nav-points {
  @apply flex w-full flex-col items-center gap-2 text-sm font-semibold text-stone-500 transition-all duration-100 on-md:gap-1 on-md:text-[0.75rem];
}

.nav-points > .material-icons {
  @apply rounded-full;
}

.nav-points.active {
  @apply !text-stone-900;
}

.nav-points:hover {
  @apply text-stone-700;
}

.nav-points:disabled {
  @apply opacity-60;
}

.nav-points:hover:disabled {
  @apply text-stone-600;
}
</style>
