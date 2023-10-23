<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//vue-router
const route = useRoute()
const router = useRouter()

//initialization of values
const index = ref(0)
const profileState = ref(false)
const profileToggle = () => (profileState.value = !profileState.value)

const sidebarState = ref(false)
const sidebarToggle = () => (sidebarState.value = !sidebarState.value)

let firstName = ''
let lastName = ''
let email = ''

//getting user data
await fetch(`http://localhost:3000/users/user/${route.params.userId}`)
  .then(async (response) => {
    const message = await response.json()

    firstName = message.first_name
    lastName = message.last_name
    email = message.email
  })
  .catch((err) => {
    console.log(err)
  })

async function logout() {
  await fetch('http://localhost:3000/users/auth/get', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    })
  })
    .then(() => {
      localStorage.setItem('token', '')
    })
    .catch((err) => console.log(err))

  router.push('/')
}
</script>

<template>
  <div class="flex h-screen flex-row font-medium">
    <!-- the sidebar wrapper -->
    <div
      :class="[sidebarState ? 'basis-80' : 'basis-20']"
      class="group flex flex-col overflow-x-hidden bg-stone-800 px-2 py-2 transition-all duration-300 ease-in-out"
      tabindex="0"
    >
      <!-- hamburger icon -->
      <div class="basis-1/3">
        <button
          @click="sidebarToggle()"
          :class="[sidebarState ? 'gap-4' : 'gap-10']"
          class="nav-points"
        >
          <span v-if="!sidebarState" class="material-icons"> menu </span>
          <span v-else class="material-icons"> close </span>
          <span class="nav-name" :class="[sidebarState ? 'opacity-100' : 'opacity-0']">
            Close
          </span>
        </button>
      </div>

      <!-- nav points -->
      <div class="flex basis-1/3 flex-col justify-center gap-1 text-stone-400">
        <button
          @click="index = 0"
          :class="[sidebarState ? 'gap-4' : 'gap-10', index === 0 ? 'active' : '']"
          class="nav-points"
        >
          <span class="material-icons"> description </span>
          <span class="nav-name" :class="[sidebarState ? 'opacity-100' : 'opacity-0']">
            All sheets
          </span>
        </button>
        <button
          @click="index = 1"
          :class="[sidebarState ? 'gap-4' : 'gap-10', index === 1 ? 'active' : '']"
          class="nav-points"
        >
          <span class="material-icons"> push_pin </span>
          <span :class="[sidebarState ? 'opacity-100' : 'opacity-0']" class="nav-name">
            Pinned
          </span>
        </button>
        <button
          @click="index = 2"
          :class="[sidebarState ? 'gap-4' : 'gap-10', index === 2 ? 'active' : '']"
          class="nav-points"
        >
          <span class="material-icons"> lightbulb </span>
          <span :class="[sidebarState ? 'opacity-100' : 'opacity-0']" class="nav-name">
            Important
          </span>
        </button>
      </div>

      <!-- profile section -->
      <div class="flex basis-1/3 items-end">
        <div class="flex w-full flex-row items-center gap-2">
          <VButton
            @click="profileToggle()"
            btn-style="ghost"
            :class="[sidebarState ? '!gap-4' : '!gap-10']"
            class="w-full !px-[13px] !py-1 duration-300 hover:!bg-stone-700"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center overflow-clip rounded-full bg-emerald-400 text-base font-semibold text-emerald-900"
            >
              {{ firstName.split('')[0] + lastName.split('')[0] }}
            </div>
            <div
              :class="[sidebarState ? 'opacity-100' : 'opacity-0']"
              class="whitespace-nowrap transition-opacity duration-300 ease-in-out"
            >
              {{ firstName + ' ' + lastName }}
            </div>
          </VButton>
        </div>
      </div>
    </div>

    <!-- content slot -->
    <slot :index="index" />

    <!-- modal for profile options -->
    <VModal :state="profileState">
      <form>
        <!-- header section -->
        <div class="flex w-full flex-row items-center justify-between">
          <h2>Your Profile</h2>
          <VButton @click="profileToggle()" btn-style="icon-ghost" type="button">
            <span class="material-icons"> close </span>
          </VButton>
        </div>

        <!-- change fields section -->
        <div class="flex flex-col items-center gap-2">
          <!-- email -->
          <label class="input-labels">
            Email
            <VTextBox input-type="email" :value="email" />
          </label>

          <!-- full name -->
          <div class="flex w-full flex-row items-center gap-2">
            <label
              class="flex basis-1/2 flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200"
            >
              First Name
              <VTextBox input-type="text" :value="firstName" />
            </label>
            <label
              class="flex basis-1/2 flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200"
            >
              Last Name
              <VTextBox input-type="text" :value="lastName" />
            </label>
          </div>

          <!-- passwords -->
          <label class="input-labels">
            Old Password
            <VTextBox input-type="password" />
          </label>
          <label class="input-labels">
            New Password
            <VTextBox input-type="password" />
          </label>
          <label class="input-labels">
            Confirm Password
            <VTextBox input-type="password" />
          </label>

          <!-- actions -->
          <VButton type="button" color-state="info" class="w-full justify-center">
            <span class="material-icons"> update </span>
            Update Account
          </VButton>
          <div class="flex w-full flex-row items-center justify-between px-2">
            <button
              type="button"
              class="flex flex-row items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
            >
              <span class="material-icons text-base"> delete </span>
              Delete Account
            </button>
            <button
              @click="logout()"
              type="button"
              class="flex flex-row items-center gap-2 text-sm text-stone-400 transition-colors hover:text-emerald-400"
            >
              <span class="material-icons text-base"> logout </span>
              Logout
            </button>
          </div>
        </div>
      </form>
    </VModal>
  </div>
</template>

<style scoped>
.input-labels {
  @apply flex w-full flex-col gap-1 text-stone-400 transition-colors duration-100 ease-in-out focus-within:text-stone-200;
}

.nav-points {
  @apply relative flex w-full select-none flex-row items-center whitespace-nowrap rounded-xl px-[20px] py-2 hover:bg-stone-700;

  transition:
    gap 300ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-points.active {
  @apply bg-emerald-800 text-stone-300;
}

.nav-points.active::before {
  @apply absolute -left-[2px] bottom-2 right-[calc(100%-2px)] top-2 rounded-full bg-emerald-400 content-[''];
}

.nav-points > .material-icons {
  @apply text-2xl;
}

.nav-points > .nav-name {
  @apply text-base transition-opacity duration-300 ease-in-out;
}
</style>
