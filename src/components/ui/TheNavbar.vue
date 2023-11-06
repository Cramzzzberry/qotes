<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useSelectedSheets } from '@/composables/selectedSheets'
import TheProfileSection from '@/components/ui/TheProfileSection.vue'

//vue-router
const route = useRoute()

//initialization of values
const index = ref(0)
const profileState = ref(false)
const profileToggle = () => (profileState.value = !profileState.value)

const selectedSheets = useSelectedSheets()
const hasSelection = ref(false)

const modalState = ref(false)
const modalToggle = () => (modalState.value = !modalState.value)

watchEffect(() => {
  hasSelection.value = selectedSheets.hasSelection.value
})

let firstName = ''
let lastName = ''
let email = ''

//getting user data
await fetch(`http://localhost:3000/users/get-user/${route.params.userId}`)
  .then(async (response) => {
    const profile = await response.json()

    firstName = profile.first_name
    lastName = profile.last_name
    email = profile.email
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<template>
  <div class="flex h-screen flex-row font-medium">
    <!-- the sidebar wrapper -->
    <div class="flex flex-col items-center overflow-x-hidden bg-stone-800 px-3 py-6">
      <!-- profile section -->
      <div class="flex w-full flex-col items-center gap-2">
        <button
          @click="profileToggle()"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-xl font-semibold text-emerald-900 transition-opacity hover:opacity-70"
        >
          {{ firstName.split('')[0] + lastName.split('')[0] }}
        </button>
      </div>

      <button
        @click="modalToggle()"
        class="mt-4 flex items-center justify-center rounded-2xl bg-amber-400 p-3 text-amber-900 transition-colors hover:bg-amber-500"
      >
        <span class="material-icons text-3xl leading-none"> add </span>
      </button>

      <div class="mt-10 flex flex-col items-center gap-4">
        <button @click="index = 0" :disabled="hasSelection" :class="[index === 0 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> description </span>
          <span>All</span>
        </button>
        <button @click="index = 1" :disabled="hasSelection" :class="[index === 1 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> push_pin </span>
          <span>Pinned</span>
        </button>
        <button @click="index = 2" :disabled="hasSelection" :class="[index === 2 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> lightbulb </span>
          <span>Important</span>
        </button>
      </div>
    </div>

    <!-- content slot -->
    <slot :index="index" />

    <!-- modal for profile options -->
    <VModal :state="profileState">
      <!-- header section -->
      <div class="flex w-full flex-row items-center justify-between">
        <h2>Your Profile</h2>
        <VButton @click="profileToggle()" btn-style="icon-ghost" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <suspense>
        <TheProfileSection :first-name="firstName" :last-name="lastName" :email="email" />
      </suspense>
    </VModal>

    <!-- create modal -->
    <VModal :state="modalState">
      <div class="flex flex-row items-center justify-between">
        <h2>Create a new sheet</h2>

        <!-- close button -->
        <VButton @click="modalToggle()" btn-style="icon-ghost" type="button">
          <span class="material-icons"> close </span>
        </VButton>
      </div>

      <VFormCreateSheet />
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
</style>
