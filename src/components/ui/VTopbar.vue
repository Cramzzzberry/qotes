<script setup>
import { ref, reactive, onMounted } from 'vue'
import { profileStore } from '@/store'
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

const { pin, important, eraseSheets, cancelSelection } = useSelect()
const deleteDialog = reactive({
  state: false,
  toggle() {
    this.state = !this.state
  },
  confirm() {
    eraseSheets()
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
  <div class="grow overflow-y-scroll" ref="scrollComponent">
    <div
      class="sticky top-0 z-10 h-[132px] bg-emerald-50 px-16 pb-3 pt-16 on-lg:h-[186px] on-md:h-[142px] on-md:px-8 on-md:pb-2 on-md:pt-12 on-sm:px-4"
    >
      <Transition name="fade-down" mode="out-in">
        <!-- topbar -->
        <div
          v-if="!selectionStore.isFilled"
          class="flex flex-row items-center justify-between on-lg:flex-col on-lg:items-start on-lg:justify-normal on-lg:gap-2"
        >
          <div class="flex flex-row items-center justify-between on-lg:w-full">
            <div class="flex flex-row items-center gap-2">
              <span v-if="props.topBarIcon !== null" class="material-icons text-3xl on-md:text-2xl">
                {{ props.topBarIcon }}
              </span>
              <h1>{{ props.topBarTitle }}</h1>
            </div>

            <!-- profile section -->
            <div class="hidden flex-col items-center on-lg:flex">
              <button
                @click="profileStore.toggleModal()"
                class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-lg font-semibold text-amber-900 transition-colors hover:bg-amber-300 on-md:h-10 on-md:w-10"
              >
                <!-- <span v-if="account.loading" class="material-icons animate-pulse"> pending </span>
          <span v-else>{{ account.user.firstName.split('')[0] + account.user.lastName.split('')[0] }}</span> -->
                <span>{{ profileStore.initials }}</span>
              </button>
            </div>
          </div>

          <!-- action bar -->
          <div class="flex basis-1/2 flex-row items-center justify-end gap-2 on-xl:basis-[527px] on-lg:w-full on-lg:basis-auto on-sm:gap-1">
            <slot name="action-bar" />

            <!-- profile section -->
            <div class="flex flex-col items-center on-lg:hidden">
              <button
                @click="profileStore.toggleModal()"
                class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-lg font-semibold text-amber-900 transition-colors hover:bg-amber-300"
              >
                <!-- <span v-if="account.loading" class="material-icons animate-pulse"> pending </span>
          <span v-else>{{ account.user.firstName.split('')[0] + account.user.lastName.split('')[0] }}</span> -->
                <span>{{ profileStore.initials }}</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="flex h-full flex-row items-center justify-between on-lg:items-end on-lg:pb-4 on-md:pb-0">
          <div class="flex flex-row items-center gap-4">
            <VButton @click="cancelSelection()" variant="ghost icon" type="button">
              <span class="material-icons font-bold"> close </span>
            </VButton>
            <h1><span class="on-lg:hidden">Selected sheets</span> ({{ selectionStore.length }})</h1>
          </div>
          <div class="flex flex-row gap-2">
            <VButton v-if="!selectionStore.organizedList.pinStates.includes('true')" @click="pinDialog.toggle(true)" variant="ghost">
              <span class="material-icons-outlined"> push_pin </span>
              <span class="on-sm:hidden">Pin</span>
            </VButton>
            <VButton v-if="!selectionStore.organizedList.pinStates.includes('false')" @click="pinDialog.toggle(false)" variant="ghost">
              <span class="material-icons"> push_pin </span>
              <span class="on-sm:hidden">Unpin</span>
            </VButton>
            <VButton v-if="!selectionStore.organizedList.importantStates.includes('true')" @click="importantDialog.toggle(true)" variant="ghost">
              <span class="material-icons-outlined"> lightbulb </span>
              <span class="on-sm:hidden">Important</span>
            </VButton>
            <VButton v-if="!selectionStore.organizedList.importantStates.includes('false')" @click="importantDialog.toggle(false)" variant="ghost">
              <span class="material-icons"> lightbulb </span>
              <span class="on-sm:hidden">Unimportant</span>
            </VButton>
            <VButton @click="deleteDialog.toggle()" variant="ghost" color="error">
              <span class="material-icons"> delete </span>
              <span class="on-sm:hidden">Delete</span>
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
      :body="`Do you want to ${pinDialog.makeItPinned ? 'pin' : 'unpin'} ${selectionStore.length} ${selectionStore.length > 1 ? 'sheets' : ' sheet'}?`"
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
