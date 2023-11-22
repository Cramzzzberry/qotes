<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAccount } from '@/composables/account'

import TheNavbar from '@/components/ui/TheNavbar.vue'
import TabAll from '@/components/tabs/TabAll.vue'
import TabPinned from '@/components/tabs/TabPinned.vue'
import TabImportant from '@/components/tabs/TabImportant.vue'
import { profileStore } from '@/store'

const route = useRoute()
const tabs = [TabAll, TabPinned, TabImportant]
localStorage.setItem('user_id', route.params.userId)

const updateAccountForm = ref(null)
const { update, logout, eraseAcc, getProfile } = useAccount(updateAccountForm)
onMounted(() => getProfile())
</script>

<template>
  <TheNavbar v-slot="slotProps">
    <Transition name="fade-up" mode="out-in">
      <KeepAlive>
        <component :is="tabs[slotProps.index]" />
      </KeepAlive>
    </Transition>
  </TheNavbar>

  <!-- modal for profile options -->
  <VModal :state="profileStore.modalState">
    <!-- header section -->
    <div class="flex w-full flex-row items-center justify-between">
      <h2>Account Settings</h2>
      <VButton @click="profileStore.toggleModal()" variant="ghost icon" type="button">
        <span class="material-icons"> close </span>
      </VButton>
    </div>

    <form @submit.prevent="update()" ref="updateAccountForm">
      <!-- change fields section -->
      <div class="flex flex-col items-center gap-2">
        <!-- email -->
        <VInput label="Email" color="info" type="email" :value="profileStore.email" name="email" wide />

        <!-- full name -->
        <div class="flex w-full flex-row items-center gap-2 on-md:flex-col">
          <VInput label="First Name" color="info" type="text" :value="profileStore.firstName" name="first_name" wide />
          <VInput label="Last Name" color="info" type="text" :value="profileStore.lastName" name="last_name" wide />
        </div>

        <!-- actions -->
        <VButton color="info" type="submit" class="w-full justify-center">
          <span class="material-icons"> update </span>
          Update Account
        </VButton>
        <div class="flex w-full flex-row items-center justify-between px-2">
          <button
            @click="profileStore.toggleDeleteDialog()"
            type="button"
            class="flex flex-row items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
          >
            <span class="material-icons text-base"> delete </span>
            Delete Account
          </button>
          <button
            @click="logout()"
            type="button"
            class="flex flex-row items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-800"
          >
            <span class="material-icons text-base"> logout </span>
            Logout
          </button>
        </div>
      </div>
    </form>
  </VModal>

  <VDialog
    :state="profileStore.deleteDialogState"
    header="Account Deletion"
    body="Do you want to delete your account permanently?"
    cancel-label="No"
    confirm-label="Yes"
    @cancel="profileStore.toggleDeleteDialog()"
    @confirm="eraseAcc()"
  />
</template>
