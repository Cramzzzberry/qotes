<script setup>
const props = defineProps({
  label: String,
  items: Array,
  name: String,
})

defineEmits(['update:label'])
</script>

<template>
  <div class="dropdown relative select-none"> <!-- month filter dropdown -->
    <button class="flex flex-row justify-between items-center rounded-sm py-2 pr-[0.625rem] pl-4 w-full bg-cod-gray-50 
    border border-cod-gray-200 text-cod-gray-600 text-base cursor-pointer transition-colors duration-100 ease-in-out
    hover:border-ocean-green-400">
      <span>{{ props.label }}</span>
      <span class="material-icons">
        expand_more
      </span>
    </button>
    <ul
      tabindex="0"
      class="dropdown-content absolute top-[calc(100%+8px)] flex flex-col gap-1 rounded-sm p-2 w-full border bg-cod-gray-50 
      drop-shadow-lg opacity-0 invisible z-10 overflow-y-auto transition-all duration-75 ease-in-out"
    > <!-- dropdown content -->
      <li 
        v-for="item in props.items" 
        :key="item"
        class="w-full"
      >
        <input 
          type="radio" 
          :name="props.name" 
          :id="item" 
          :value="item" 
          @input="$emit('update:label', $event.target.value)"
          class="hidden -top-10 absolute peer">
        <label 
          :for="item" 
          tabindex="0"
          class="block w-full px-4 py-2 rounded-sm bg-transparent text-cod-gray-600 cursor-pointer transition-colors
          duration-[25ms] ease-in-out hover:bg-cod-gray-100 hover:text-cod-gray-800 peer-checked:bg-ocean-green-400
          peer-checked:text-ocean-green-50"
        >
          {{ item }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown:focus-within > .dropdown-content {
  @apply opacity-100 visible;
}
</style>