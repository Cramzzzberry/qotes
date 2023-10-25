<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  list: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom'
  },
  btnStyle: {
    type: String,
    default: 'default'
  },
  absolute: {
    type: Boolean,
    default: false
  }
})

const dropdownPosition = {
  bottom: 'left-0 top-[calc(100%+8px)]',
  bottomEnd: 'right-0 top-[calc(100%+8px)]',
  top: 'bottom-[calc(100%+8px)] left-0',
  topEnd: 'bottom-[calc(100%+8px)] right-0',
  right: 'left-[calc(100%+8px)] top-0',
  rightEnd: 'bottom-0 left-[calc(100%+8px)]',
  left: 'right-[calc(100%+8px)] top-0',
  leftEnd: 'bottom-0 right-[calc(100%+8px)]'
}

defineEmits(['update:label'])
</script>

<template>
  <div :class="[absolute ? 'absolute' : 'relative']" class="group/dropdown select-none font-medium">
    <!-- dropdown button -->
    <slot name="button">
      <button
        type="button"
        :class="[
          {
            'border-transparent hover:text-stone-300 focus:text-stone-200': props.btnStyle === 'ghost'
          },
          {
            'border-stone-600 hover:border-stone-400 focus:border-emerald-400': props.btnStyle === 'default'
          }
        ]"
        class="flex w-full cursor-pointer flex-row items-center justify-between rounded-xl border py-2 pl-4 pr-[0.625rem] text-base text-stone-400 transition-colors duration-100 ease-in-out"
      >
        <span>{{ label }}</span>
        <span class="material-icons"> expand_more </span>
      </button>
    </slot>

    <!-- dropdown content wrapper -->
    <div
      tabindex="0"
      :class="dropdownPosition[props.position]"
      class="invisible absolute z-10 min-w-full scale-[98%] overflow-y-auto rounded-xl bg-stone-700 p-2 opacity-0 transition-all group-focus-within/dropdown:visible group-focus-within/dropdown:scale-100 group-focus-within/dropdown:opacity-100"
    >
      <!-- dropdown content -->
      <slot name="dropdown-content">
        <ul class="flex flex-col gap-1 overflow-y-auto">
          <!-- dropdown content -->
          <li v-for="item in props.list" :key="item" class="w-full">
            <input
              type="radio"
              :name="props.name"
              :id="item + props.name"
              :checked="props.label === item"
              :value="item"
              @input="$emit('update:label', $event.target.value)"
              class="peer absolute -top-10 hidden"
            />
            <label
              :for="item + props.name"
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
