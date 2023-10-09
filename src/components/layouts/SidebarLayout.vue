<script setup>
import { ref } from 'vue'

const sidebarToggle = ref(false)
</script>

<template>
  <div class="flex flex-row font-medium">
    <div
      class="group flex flex-col overflow-x-clip border-r border-r-cod-gray-200 px-2 py-4 transition-all duration-300 ease-in-out"
      :class="[sidebarToggle ? 'basis-96' : 'basis-24']"
      tabindex="0"
    >
      <div class="basis-1/3">
        <button
          @click="sidebarToggle = !sidebarToggle"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4 px-3' : 'gap-10 px-[22px]']"
        >
          <span class="material-icons"> menu </span>
          <span class="nav-name"> Close </span>
        </button>
      </div>

      <div class="flex basis-1/3 flex-col justify-center gap-1">
        <router-link
          to="/home/all-sheets"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4 px-3' : 'gap-10 px-[22px]']"
        >
          <span class="material-icons"> description </span>
          <span class="nav-name" :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']">
            All sheets
          </span>
        </router-link>
        <router-link
          to="/home/pinned"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4 px-3' : 'gap-10 px-[22px]']"
        >
          <span class="material-icons"> push_pin </span>
          <span class="nav-name" :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']">
            Pinned
          </span>
        </router-link>
        <router-link
          to="/home/important"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4 px-3' : 'gap-10 px-[22px]']"
        >
          <span class="material-icons"> lightbulb </span>
          <span class="nav-name" :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']">
            Important
          </span>
        </router-link>
      </div>

      <!-- profile section -->
      <div class="flex basis-1/3 items-end">
        <button
          class="flex w-full select-none flex-row items-center transition-all duration-300 ease-in-out"
          :class="[sidebarToggle ? 'gap-4 px-2' : 'gap-10 px-[17px]']"
        >
          <div class="h-10 w-10 shrink-0 overflow-clip rounded-full bg-ocean-green-400">
            <img src="@/assets/Cramzzzberry logo.png" alt="profile-pic" class="object-cover" />
          </div>
          <div
            class="whitespace-nowrap transition-opacity duration-300 ease-in-out"
            :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']"
          >
            Jan Roe Bantuan
          </div>
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.nav-points {
  @apply flex w-full select-none flex-row items-center whitespace-nowrap rounded-xl py-2 transition-[gap,padding] duration-300 ease-in-out hover:bg-cod-gray-200;
}

.nav-points > .material-icons {
  @apply text-3xl;
}

.nav-points > .nav-name {
  @apply text-lg transition-opacity duration-300 ease-in-out;
}
</style>
