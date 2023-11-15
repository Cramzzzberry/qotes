<script setup>
import { ref, reactive } from 'vue'
import { useAccount } from '@/composables/account'
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

const profile = reactive({
  modalState: false,
  deleteDialogState: false,
  toggleModal() {
    this.modalState = !this.modalState
  },
  toggleDeleteDialog() {
    this.deleteDialogState = !this.deleteDialogState
  }
})
const updateAccountForm = ref(null)
const { userEmail, userFirstName, userLastName, initials, update, logout, erase } = useAccount(updateAccountForm)

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
  <div class="flex h-screen flex-row font-medium">
    <!-- create sheet modal -->
    <VModal :state="createSheet.modalState">
      <div class="flex flex-row items-center justify-between">
        <h2>Create new sheet</h2>

        <!-- close button -->
        <VButton @click="createSheet.toggleModal()" btn-style="icon-ghost" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <form @submit.prevent="create()" class="flex flex-col gap-2" ref="createSheetForm">
        <div class="flex flex-col items-center gap-2">
          <label class="input-texts">
            Song Title
            <VTextBox input-type="text" name="song_title" required />
          </label>
          <label class="input-texts">
            Artist
            <VTextBox input-type="text" name="artist" required />
          </label>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-stone-400">Key</span>
          <ul class="grid grid-cols-4 gap-1 rounded-lg border border-stone-600 p-2">
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
                class="block w-full cursor-pointer whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-stone-400 transition-colors duration-100 ease-in-out hover:bg-stone-700 hover:text-stone-200 peer-checked:bg-emerald-400 peer-checked:text-emerald-900"
              >
                {{ key }}
              </label>
            </li>
          </ul>
        </div>

        <div class="flex gap-2 text-stone-400">
          <!-- pinned checkbox -->
          <input type="checkbox" class="invisible absolute -top-10" v-model="createSheet.category" value="pinned" name="pinned" id="pinned" />
          <label
            for="pinned"
            class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-300"
          >
            <span v-if="!createSheet.category.includes('pinned')" class="material-icons select-none"> check_box_outline_blank </span>
            <span v-else class="material-icons select-none"> check_box </span>
            <span class="pl-2">Pinned</span>
          </label>

          <!-- important checkbox -->
          <input type="checkbox" class="invisible absolute -top-10" v-model="createSheet.category" value="important" name="important" id="important" />
          <label
            for="important"
            class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200"
          >
            <span v-if="!createSheet.category.includes('important')" class="material-icons select-none"> check_box_outline_blank </span>
            <span v-else class="material-icons select-none"> check_box </span>
            <span class="pl-2">Important</span>
          </label>
        </div>

        <!-- create button -->
        <VButton type="submit" class="justify-center"> Create </VButton>
      </form>
    </VModal>

    <!-- the sidebar wrapper -->
    <div class="flex flex-col items-center justify-between overflow-x-hidden bg-stone-800 px-3 py-6">
      <div class="flex flex-col items-center">
        <button
          @click="createSheet.toggleModal()"
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-900 transition-colors hover:bg-emerald-500"
        >
          <span class="material-icons text-3xl leading-none"> add </span>
        </button>

        <div class="mt-16 flex flex-col items-center gap-4">
          <button @click="page.set(0)" :disabled="selectionStore.isFilled" :class="[page.index === 0 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> description </span>
            <span>All</span>
          </button>
          <button @click="page.set(1)" :disabled="selectionStore.isFilled" :class="[page.index === 1 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> push_pin </span>
            <span>Pinned</span>
          </button>
          <button @click="page.set(2)" :disabled="selectionStore.isFilled" :class="[page.index === 2 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> lightbulb </span>
            <span>Important</span>
          </button>
        </div>
      </div>

      <!-- profile section -->
      <div class="flex w-full flex-col items-center">
        <button
          @click="profile.toggleModal()"
          class="transition-color flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-xl font-semibold text-amber-900 hover:bg-amber-500"
        >
          <!-- <span v-if="account.loading" class="material-icons animate-pulse"> pending </span>
          <span v-else>{{ account.user.firstName.split('')[0] + account.user.lastName.split('')[0] }}</span> -->
          <span>{{ initials }}</span>
        </button>
      </div>
    </div>

    <!-- content slot -->
    <slot :index="page.index" />

    <!-- modal for profile options -->
    <VModal :state="profile.modalState">
      <!-- header section -->
      <div class="flex w-full flex-row items-center justify-between">
        <h2>Account Settings</h2>
        <VButton @click="profile.toggleModal()" btn-style="icon-ghost" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <form @submit.prevent="update()" ref="updateAccountForm">
        <!-- change fields section -->
        <div class="flex flex-col items-center gap-2">
          <!-- email -->
          <label class="input-texts">
            Email
            <VTextBox input-type="email" :value="userEmail" name="email" />
          </label>

          <!-- full name -->
          <div class="flex w-full flex-row items-center gap-2">
            <label class="input-texts basis-1/2">
              First Name
              <VTextBox input-type="text" :value="userFirstName" name="first_name" />
            </label>
            <label class="input-texts basis-1/2">
              Last Name
              <VTextBox input-type="text" :value="userLastName" name="last_name" />
            </label>
          </div>

          <!-- actions -->
          <VButton color-state="info" type="submit" class="w-full justify-center">
            <span class="material-icons"> update </span>
            Update Account
          </VButton>
          <div class="flex w-full flex-row items-center justify-between px-2">
            <button
              @click="profile.toggleDeleteDialog()"
              type="button"
              class="flex flex-row items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
            >
              <span class="material-icons text-base"> delete </span>
              Delete Account
            </button>
            <button
              @click="logout()"
              type="button"
              class="flex flex-row items-center gap-2 text-sm text-stone-400 transition-colors hover:text-stone-200"
            >
              <span class="material-icons text-base"> logout </span>
              Logout
            </button>
          </div>
        </div>
      </form>
    </VModal>

    <VDialog
      :state="profile.deleteDialogState"
      header="Account Deletion"
      body="Do you want to delete your account permanently?"
      cancel-label="No"
      confirm-label="Yes"
      @cancel="profile.toggleDeleteDialog()"
      @confirm="erase()"
    />
  </div>
</template>

<style scoped>
.nav-points {
  @apply flex w-full flex-col items-center gap-2 text-sm font-semibold text-stone-400 transition-all duration-100;
}

.nav-points > .material-icons {
  @apply rounded-full;
}

.nav-points.active {
  @apply !text-stone-100;
}

.nav-points:hover {
  @apply text-stone-300;
}

.nav-points:disabled {
  @apply opacity-60;
}

.nav-points:hover:disabled {
  @apply text-stone-400;
}

.input-texts {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}
</style>
