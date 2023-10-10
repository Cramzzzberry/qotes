<script setup>
defineProps({
  label: String,
  list: Array,
  name: String,
  btnType: String,
  position: String
})

defineEmits(['update:label'])
</script>

<template>
  <div class="dropdown relative select-none font-medium">
    <!-- month filter dropdown -->
    <slot name="button">
      <button
        :class="[
          btnType === 'ghost'
            ? 'border-transparent hover:text-stone-300 focus:text-stone-200'
            : 'border-stone-600 hover:border-stone-400 focus:border-emerald-400'
        ]"
        class="flex w-full cursor-pointer flex-row items-center justify-between rounded-xl border py-2 pl-4 pr-[0.625rem] text-base text-stone-400 transition-colors duration-100 ease-in-out"
      >
        <span>{{ label }}</span>
        <span class="material-icons"> expand_more </span>
      </button>
    </slot>
    <div
      tabindex="0"
      :class="[
        { 'left-0 top-[calc(100%+8px)]': position === 'bottom' },
        { 'right-0 top-[calc(100%+8px)]': position === 'bottom-end' },
        { 'bottom-[calc(100%+8px)] left-0 ': position === 'top' },
        { 'bottom-[calc(100%+8px)] right-0': position === 'top-end' },
        { 'left-[calc(100%+8px)] top-0': position === 'right' },
        { 'bottom-0 left-[calc(100%+8px)]': position === 'right-end' },
        { 'right-[calc(100%+8px)] top-0 ': position === 'left' },
        { 'bottom-0 right-[calc(100%+8px)]': position === 'left-end' }
      ]"
      class="dropdown-content invisible absolute z-10 min-w-full scale-[98%] overflow-y-auto rounded-xl bg-stone-700 p-2 opacity-0 transition-all delay-75"
    >
      <slot name="dropdown-content">
        <ul class="flex flex-col gap-1">
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
              class="block w-full cursor-pointer whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-stone-400 transition-colors duration-100 ease-in-out hover:bg-stone-600 hover:text-stone-200 peer-checked:bg-emerald-400 peer-checked:text-emerald-900"
            >
              {{ item }}
            </label>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.dropdown:focus-within > .dropdown-content {
  @apply visible scale-100 opacity-100;
}
</style>
