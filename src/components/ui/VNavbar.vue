<script setup></script>

<template>
  <!-- navbar -->
  <div
    class="sticky top-0 grid h-14 w-full select-none grid-cols-3 items-center border-b border-b-cod-gray-100 bg-cod-gray-50 px-4"
  >
    <!-- left side content -->
    <slot name="left">
      <div>
        <router-link to="/home" class="text-2xl font-semibold text-ocean-green-400">
          Qotes
        </router-link>
      </div>
    </slot>

    <!-- middle content -->
    <slot></slot>

    <!-- right side content -->
    <slot name="right">
      <div class="flex flex-row justify-end">
        <button class="flex select-none items-center">
          <div class="h-10 w-10 shrink-0 overflow-clip rounded-full bg-ocean-green-400">
            <img src="@/assets/Cramzzzberry logo.png" alt="profile-pic" class="object-cover" />
          </div>
        </button>
      </div>
    </slot>
  </div>
</template>
