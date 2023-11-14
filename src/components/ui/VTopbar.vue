<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useSelect } from '@/composables/select'
import { scrollStore } from '@/store'
import { selectionStore } from '@/store'

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

const { pin, important, erase, cancelSelection } = useSelect()
const deleteDialog = reactive({
  state: false,
  toggle() {
    this.state = !this.state
  },
  confirm() {
    erase()
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
    pin(this.makeItPinned)
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
    important(this.markAsImportant)
    this.toggle()
  }
})

const scrollComponent = ref(null)
onMounted(() => (scrollStore.value = scrollComponent.value))
</script>

<template>
  <div class="grow overflow-y-auto pb-2" ref="scrollComponent">
    <div class="sticky top-0 z-10 mb-1 h-[132px] bg-stone-900 px-16 pb-2 pt-16">
      <Transition name="fade-down" mode="out-in">
        <div v-if="!selectionStore.isFilled" class="flex flex-row items-center justify-between">
          <!-- topbar -->
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
            <slot name="action-bar" />
          </div>
        </div>

        <div v-else class="flex flex-row items-center justify-between">
          <div class="flex flex-row items-center gap-2">
            <VButton @click="cancelSelection()" btn-style="icon-ghost" type="button">
              <span class="material-icons font-bold"> close </span>
            </VButton>
            <h1>Selected sheets ({{ selectionStore.length }})</h1>
          </div>
          <div class="flex flex-row gap-2">
            <VButton v-if="!selectionStore.organizedList.pinStates.includes('true')" @click="pinDialog.toggle(true)" btn-style="ghost">
              <span class="material-icons"> push_pin </span>
              <span>Pin</span>
            </VButton>
            <VButton v-if="!selectionStore.organizedList.pinStates.includes('false')" @click="pinDialog.toggle(false)" btn-style="ghost">
              <span class="material-icons"> remove_circle </span>
              <span>Unpin</span>
            </VButton>
            <VButton v-if="!selectionStore.organizedList.importantStates.includes('true')" @click="importantDialog.toggle(true)" btn-style="ghost">
              <span class="material-icons"> lightbulb </span>
              <span>Mark as Important</span>
            </VButton>
            <VButton v-if="!selectionStore.organizedList.importantStates.includes('false')" @click="importantDialog.toggle(false)" btn-style="ghost">
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
    </div>

    <VDialog
      :state="deleteDialog.state"
      header="Delete Sheets"
      :body="`Do you want to delete ${selectionStore.length} ${selectionStore.length > 1 ? 'sheets' : ' sheet'}?`"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="deleteDialog.toggle()"
      @confirm="deleteDialog.confirm()"
    />

    <VDialog
      :state="pinDialog.state"
      header="Pin Sheets"
      :body="`Do you want to pin ${selectionStore.length} ${selectionStore.length > 1 ? 'sheets' : ' sheet'}?`"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="pinDialog.toggle()"
      @confirm="pinDialog.confirm()"
    />

    <VDialog
      :state="importantDialog.state"
      header="Important Sheets"
      :body="`Do you want to mark ${selectionStore.length} ${selectionStore.length > 1 ? 'sheets' : ' sheet'} as
      ${importantDialog.markAsImportant ? 'important' : 'unimportant'}?`"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="importantDialog.toggle()"
      @confirm="importantDialog.confirm()"
    />

    <slot name="body" />
  </div>
</template>
