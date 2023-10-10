<script setup>
defineProps({
  label: String,
  list: Array,
  name: String
})

defineEmits(['update:label'])
</script>

<template>
  <div class="dropdown relative select-none font-medium">
    <!-- month filter dropdown -->
    <button
      class="flex w-full cursor-pointer flex-row items-center justify-between rounded-xl border border-stone-600 py-2 pl-4 pr-[0.625rem] text-base text-stone-400 transition-colors duration-100 ease-in-out hover:border-stone-400 focus:border-emerald-400"
    >
      <span>{{ label }}</span>
      <span class="material-icons"> expand_more </span>
    </button>
    <ul
      tabindex="0"
      class="dropdown-content invisible absolute top-[calc(100%+8px)] z-10 flex w-full flex-col gap-1 overflow-y-auto rounded-xl bg-stone-700 p-2 opacity-0 transition-all duration-75 ease-in-out"
    >
      <!-- dropdown content -->
      <li v-for="item in list" :key="item" class="w-full">
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
          class="block w-full cursor-pointer rounded-md bg-transparent px-4 py-2 text-stone-400 transition-colors duration-100 ease-in-out hover:bg-stone-600 hover:text-stone-200 peer-checked:bg-emerald-400 peer-checked:text-emerald-900"
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
