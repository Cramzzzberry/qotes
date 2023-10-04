<template>
  <div class="sticky top-0 grid grid-cols-3 items-center px-40 py-2 bg-cod-gray-50 border-b border-b-cod-gray-100
  w-full h-[61px]">
    <div>
      <router-link
        to="/dashboard"
        class="text-ocean-green-400 text-2xl font-semibold transition-colors duration-100
        hover:text-ocean-green-300"
      >
        Achord
      </router-link>
    </div>
    <input 
      type="text"
      placeholder="Search here..."
      class="px-4 py-3 bg-cod-gray-100 rounded-sm outline-none text-cod-gray-700 text-base"
    >
    <div class="flex flex-row justify-end">
      <a href="#" class="flex flex-row items-center gap-2">
        <span>Jan Roe Bantuan</span>
        <div class="shrink-0 w-8 h-8 rounded-full bg-ocean-green-400"></div>
      </a>
    </div>
  </div>
</template>