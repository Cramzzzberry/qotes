<script setup>
import { ref } from 'vue'

const sidebarToggle = ref(false)
const index = ref(0)
</script>

<template>
  <div class="flex h-screen flex-row font-medium">
    <!-- the sidebar wrapper -->
    <div
      class="group flex flex-col overflow-x-clip border-r border-r-cod-gray-200 px-2 py-4 transition-all duration-300 ease-in-out"
      :class="[sidebarToggle ? 'basis-80' : 'basis-20']"
      tabindex="0"
    >
      <!-- hamburger icon -->
      <div class="basis-1/3">
        <button
          @click="sidebarToggle = !sidebarToggle"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4' : 'gap-10']"
        >
          <span class="material-icons"> menu </span>
          <span class="nav-name"> Close </span>
        </button>
      </div>

      <!-- nav points -->
      <div class="flex basis-1/3 flex-col justify-center gap-1">
        <button
          @click="index = 0"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4' : 'gap-10', index === 0 ? 'active' : '']"
        >
          <span class="material-icons"> description </span>
          <span class="nav-name" :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']">
            All sheets
          </span>
        </button>
        <button
          @click="index = 1"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4' : 'gap-10', index === 1 ? 'active' : '']"
        >
          <span class="material-icons"> push_pin </span>
          <span class="nav-name" :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']">
            Pinned
          </span>
        </button>
        <button
          @click="index = 2"
          class="nav-points"
          :class="[sidebarToggle ? 'gap-4' : 'gap-10', index === 2 ? 'active' : '']"
        >
          <span class="material-icons"> lightbulb </span>
          <span class="nav-name" :class="[sidebarToggle ? 'opacity-100' : 'opacity-0']">
            Important
          </span>
        </button>
      </div>

      <!-- profile section -->
      <div class="flex basis-1/3 items-end">
        <button
          class="flex w-full select-none flex-row items-center px-[10px] transition-all duration-300 ease-in-out"
          :class="[sidebarToggle ? 'gap-4' : 'gap-10']"
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

    <!-- content slot -->
    <slot :index="index" />
  </div>
</template>

<style scoped>
.nav-points {
  @apply flex w-full select-none flex-row items-center whitespace-nowrap rounded-xl px-[18px] py-2 transition-[gap] duration-300 ease-in-out hover:bg-cod-gray-200;
}

.nav-points.active {
  @apply bg-ocean-green-400 text-ocean-green-900;
}

.nav-points > .material-icons {
  @apply text-2xl;
}

.nav-points > .nav-name {
  @apply text-base transition-opacity duration-300 ease-in-out;
}
</style>
