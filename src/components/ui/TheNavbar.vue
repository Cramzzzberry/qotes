<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { selection } from '@/composables/selectedSheets'
import { useAccountSettings, user } from '@/composables/accountSettings'
import { useCreateSheet } from '@/composables/createSheet'
import { setKeys } from '@/assets/scripts/change-key'

const route = useRoute()
const accountSettings = useAccountSettings()

const musicKeys = setKeys
const newSheetkey = ref('C')
const sheetFormRef = ref(null)
const labelSelection = ref([])
const profileOpenState = ref(false)
const createSheetOpenState = ref(false)
const updateAccountFormRef = ref(null)

const index = ref(0)
function setPage(number = 0) {
  index.value = number
}

//getting user data
await fetch(`http://localhost:3000/users/get-user/${route.params.userId}`)
  .then(async (response) => {
    const profile = await response.json()

    user.firstName = profile.first_name
    user.lastName = profile.last_name
    user.email = profile.email
  })
  .catch((err) => {
    console.log(err)
  })

function toggleProfileModal() {
  profileOpenState.value = !profileOpenState.value
}

//Creating sheets
function toggleCreateSheetModal() {
  createSheetOpenState.value = !createSheetOpenState.value
}

function createSheet() {
  useCreateSheet(sheetFormRef)
  toggleCreateSheetModal()
}
</script>

<template>
  <div class="flex h-screen flex-row font-medium">
    <!-- the sidebar wrapper -->
    <div class="flex flex-col items-center overflow-x-hidden bg-stone-800 px-3 py-6">
      <!-- profile section -->
      <div class="flex w-full flex-col items-center gap-2">
        <button
          @click="toggleProfileModal()"
          class="transition-color flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-xl font-semibold text-emerald-900 hover:bg-emerald-500"
        >
          {{ user.firstName.split('')[0] + user.lastName.split('')[0] }}
        </button>
      </div>

      <button
        @click="toggleCreateSheetModal()"
        class="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-amber-900 transition-colors hover:bg-amber-500"
      >
        <span class="material-icons text-3xl leading-none"> add </span>
      </button>

      <div class="mt-16 flex flex-col items-center gap-4">
        <button @click="setPage(0)" :disabled="selection.isFilled" :class="[index === 0 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> description </span>
          <span>All</span>
        </button>
        <button @click="setPage(1)" :disabled="selection.isFilled" :class="[index === 1 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> push_pin </span>
          <span>Pinned</span>
        </button>
        <button @click="setPage(2)" :disabled="selection.isFilled" :class="[index === 2 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> lightbulb </span>
          <span>Important</span>
        </button>
      </div>
    </div>

    <!-- content slot -->
    <slot :index="index" />

    <!-- modal for profile options -->
    <VModal :state="profileOpenState">
      <!-- header section -->
      <div class="flex w-full flex-row items-center justify-between">
        <h2>Your Profile</h2>
        <VButton @click="toggleProfileModal()" btn-style="icon-ghost" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <form @submit.prevent="accountSettings.updateAccount(route.params.userId, updateAccountFormRef)" ref="updateAccountFormRef">
        <!-- change fields section -->
        <div class="flex flex-col items-center gap-2">
          <!-- email -->
          <label class="input-texts">
            Email
            <VTextBox input-type="email" :value="user.email" name="email" />
          </label>

          <!-- full name -->
          <div class="flex w-full flex-row items-center gap-2">
            <label class="flex basis-1/2 flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200">
              First Name
              <VTextBox input-type="text" :value="user.firstName" name="first_name" />
            </label>
            <label class="flex basis-1/2 flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200">
              Last Name
              <VTextBox input-type="text" :value="user.lastName" name="last_name" />
            </label>
          </div>

          <!-- actions -->
          <VButton color-state="info" type="submit" class="w-full justify-center">
            <span class="material-icons"> update </span>
            Update Account
          </VButton>
          <div class="flex w-full flex-row items-center justify-between px-2">
            <button
              @click="accountSettings.deleteAccount(route.params.userId)"
              type="button"
              class="flex flex-row items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
            >
              <span class="material-icons text-base"> delete </span>
              Delete Account
            </button>
            <button
              @click="accountSettings.logoutAccount()"
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

    <!-- create sheet modal -->
    <VModal :state="createSheetOpenState">
      <div class="flex flex-row items-center justify-between">
        <h2>Create a new sheet</h2>

        <!-- close button -->
        <VButton @click="toggleCreateSheetModal()" btn-style="icon-ghost" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <form @submit.prevent="createSheet()" class="flex flex-col gap-2" ref="sheetFormRef">
        <div class="flex flex-col items-center gap-2">
          <label class="input-texts">
            Song Title
            <VTextBox input-type="text" name="song_title" required />
          </label>
          <label class="input-texts">
            Singer/Songwriter
            <VTextBox input-type="text" name="song_writer" required />
          </label>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-stone-400">Key</span>
          <ul class="grid grid-cols-4 gap-1 rounded-lg border border-stone-600 p-2">
            <!-- dropdown content -->
            <li v-for="key in musicKeys" :key="key" class="w-full">
              <input
                type="radio"
                name="song_key"
                :id="key + ' id'"
                :checked="newSheetkey === key"
                :value="key"
                v-model="newSheetkey"
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
          <input type="checkbox" class="invisible absolute -top-10" v-model="labelSelection" value="pinned" name="pinned" id="pinned" />
          <label
            for="pinned"
            class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-300"
          >
            <span v-if="!labelSelection.includes('pinned')" class="material-icons select-none"> check_box_outline_blank </span>
            <span v-else class="material-icons select-none"> check_box </span>
            <span class="pl-2">Pinned</span>
          </label>

          <!-- important checkbox -->
          <input type="checkbox" class="invisible absolute -top-10" v-model="labelSelection" value="important" name="important" id="important" />
          <label
            for="important"
            class="flex w-fit cursor-pointer items-center justify-center rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200"
          >
            <span v-if="!labelSelection.includes('important')" class="material-icons select-none"> check_box_outline_blank </span>
            <span v-else class="material-icons select-none"> check_box </span>
            <span class="pl-2">Important</span>
          </label>
        </div>

        <!-- create button -->
        <VButton type="submit" class="justify-center"> Create </VButton>
      </form>
    </VModal>
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
