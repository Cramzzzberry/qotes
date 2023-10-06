<script setup>
defineProps({
  label: String,
  items: Array,
  name: String
})

defineEmits(['update:label'])
</script>

<template>
  <div class="dropdown relative select-none">
    <!-- month filter dropdown -->
    <button
      class="flex w-full cursor-pointer flex-row items-center justify-between rounded-sm border border-cod-gray-200 bg-cod-gray-50 py-2 pl-4 pr-[0.625rem] text-base text-cod-gray-600 transition-colors duration-100 ease-in-out hover:border-ocean-green-400"
    >
      <span>{{ label }}</span>
      <span class="material-icons"> expand_more </span>
    </button>
    <ul
      tabindex="0"
      class="dropdown-content invisible absolute top-[calc(100%+8px)] z-10 flex w-full flex-col gap-1 overflow-y-auto rounded-sm border bg-cod-gray-50 p-2 opacity-0 drop-shadow-lg transition-all duration-75 ease-in-out"
    >
      <!-- dropdown content -->
      <li v-for="item in items" :key="item" class="w-full">
        <input
          type="radio"
          :name="name"
          :id="item"
          :value="item"
          :checked="label === item"
          @input="$emit('update:label', $event.target.value)"
          class="peer absolute -top-10 hidden"
        />
        <label
          :for="item"
          tabindex="0"
          class="block w-full cursor-pointer rounded-sm bg-transparent px-4 py-2 text-cod-gray-600 transition-colors duration-100 ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-800 peer-checked:bg-ocean-green-400 peer-checked:text-ocean-green-900"
        >
          {{ item }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown:focus-within > .dropdown-content {
  @apply visible opacity-100;
}
</style>
