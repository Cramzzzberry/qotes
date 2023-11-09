<script setup>
import { ref, reactive } from 'vue'
import { setKeys } from '@/assets/scripts/change-key'
import { useSelectedSheets, selection } from '@/composables/selectedSheets'

const selectedSheets = useSelectedSheets()

defineEmits(['update:search'])
const props = defineProps({
  topBarTitle: {
    type: String,
    required: true,
    default: 'Put title here'
  },
  topBarDesc: {
    type: String,
    required: true,
    default: 'Put description here'
  },
  topBarIcon: String
})

const searchValue = ref('')
const dropdown = reactive({
  keys: ['All Keys', ...setKeys],
  label: 'All Keys'
})

function cancelSelection() {
  selection.list = []
}

/* Dialog section */
const deleteDialog = reactive({
  state: false,
  toggle() {
    this.state = !this.state
  },
  confirm() {
    selectedSheets.erase()
    this.toggle()
  }
})

const pinDialog = reactive({
  state: false,
  makeItPinned: null,
  toggle(pin = null) {
    this.state = !this.state
    this.makeItPinned = pin
  },
  confirm() {
    selectedSheets.pin(this.makeItPinned)
    this.toggle()
  }
})

const importantDialog = reactive({
  state: false,
  markAsImportant: null,
  toggle(mark = null) {
    this.state = !this.state
    this.markAsImportant = mark
  },
  confirm() {
    selectedSheets.important(this.markAsImportant)
    this.toggle()
  }
})
</script>

<template>
  <div class="grow overflow-y-auto pb-2">
    <Transition name="fade-down" mode="out-in">
      <div v-if="!selection.isFilled" class="sticky top-0 z-10 mb-1 flex h-[132px] flex-row items-center justify-between bg-stone-900 px-16 pb-2 pt-16">
        <!-- topbar information -->
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-4">
            <h1>{{ props.topBarTitle }}</h1>
            <span v-if="props.topBarIcon !== null" class="material-icons text-3xl">
              {{ props.topBarIcon }}
            </span>
          </div>
          <div class="text-stone-400">{{ props.topBarDesc }}</div>
        </div>

        <!-- action bar -->
        <div class="flex basis-1/2 flex-row items-center gap-2">
          <!-- search box -->
          <div class="group/search relative grow">
            <label class="flex flex-row items-center gap-2">
              <span class="material-icons text-2xl text-stone-400"> search </span>
              <input
                v-model="searchValue"
                type="text"
                placeholder="Search"
                class="grow border-b-2 border-b-stone-600 bg-transparent p-2 outline-none transition-colors duration-100 ease-in-out placeholder:text-stone-400 focus:border-b-emerald-400"
              />
            </label>
          </div>

          <!-- music keys dropdown -->
          <VDropdown v-model:label="dropdown.label" :list="dropdown.keys" name="songKeys" class="dropdown-height-limit w-32" />
        </div>
      </div>

      <div v-else class="sticky top-0 z-10 mb-1 flex h-[132px] flex-row items-center justify-between bg-stone-900 px-16 pb-2 pt-16">
        <div class="flex flex-row items-center gap-2">
          <VButton @click="cancelSelection()" btn-style="icon-ghost" type="button">
            <span class="material-icons font-bold"> close </span>
          </VButton>
          <h1>Selected sheets ({{ selection.length }})</h1>
        </div>
        <div class="flex flex-row gap-2">
          <VButton v-if="!selection.organizedList.pinStates.includes('true')" @click="pinDialog.toggle(true)" btn-style="ghost">
            <span class="material-icons"> push_pin </span>
            <span>Pin</span>
          </VButton>
          <VButton v-if="!selection.organizedList.pinStates.includes('false')" @click="pinDialog.toggle(false)" btn-style="ghost">
            <span class="material-icons"> remove_circle </span>
            <span>Unpin</span>
          </VButton>
          <VButton v-if="!selection.organizedList.importantStates.includes('true')" @click="importantDialog.toggle(true)" btn-style="ghost">
            <span class="material-icons"> lightbulb </span>
            <span>Mark as Important</span>
          </VButton>
          <VButton v-if="!selection.organizedList.importantStates.includes('false')" @click="importantDialog.toggle(false)" btn-style="ghost">
            <span class="material-icons"> remove_circle </span>
            <span>Mark as Unimportant</span>
          </VButton>
          <VButton @click="deleteDialog.toggle()" btn-style="ghost" color-state="error">
            <span class="material-icons"> delete </span>
            <span>Delete</span>
          </VButton>
        </div>
      </div>
    </Transition>

    <VDialog
      :state="deleteDialog.state"
      header="Delete Sheets"
      :body="`Do you want to delete ${selection.length} ${selection.length > 1 ? 'sheets' : ' sheet'}?`"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="deleteDialog.toggle()"
      @confirm="deleteDialog.confirm()"
    />

    <VDialog
      :state="pinDialog.state"
      header="Pin Sheets"
      :body="`Do you want to pin ${selection.length} ${selection.length > 1 ? 'sheets' : ' sheet'}?`"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="pinDialog.toggle()"
      @confirm="pinDialog.confirm()"
    />

    <VDialog
      :state="importantDialog.state"
      header="Important Sheets"
      :body="`Do you want to mark ${selection.length} ${selection.length > 1 ? 'sheets' : ' sheet'} as
      ${importantDialog.markAsImportant ? 'important' : 'unimportant'}?`"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="importantDialog.toggle()"
      @confirm="importantDialog.confirm()"
    />

    <slot name="body" :search-value="searchValue" :selected-key="dropdown.label" />
  </div>
</template>

<style scoped>
.dropdown-height-limit:deep(div) {
  max-height: calc(100vh - 140px);
}
</style>
