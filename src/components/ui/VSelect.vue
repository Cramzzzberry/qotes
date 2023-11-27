<script setup>
defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String,
  list: {
    type: Array,
    required: true
  },
  variant: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom'
  },
  absolute: {
    type: Boolean,
    default: false
  }
})

const dropdownPosition = {
  bottom: 'left-0 top-[calc(100%+8px)]',
  'bottom end': 'right-0 top-[calc(100%+8px)]',
  top: 'bottom-[calc(100%+8px)] left-0',
  'top end': 'bottom-[calc(100%+8px)] right-0',
  right: 'left-[calc(100%+8px)] top-0',
  'right end': 'bottom-0 left-[calc(100%+8px)]',
  left: 'right-[calc(100%+8px)] top-0',
  'left end': 'bottom-0 right-[calc(100%+8px)]'
}

function buttonStyle() {
  let btnFoundation = ''

  if (props.variant === null) {
    btnFoundation = 'px-4 py-2 border-stone-400 focus:border-emerald-500 hover:border-emerald-500 text-stone-800'
  } else if (props.variant === 'ghost') {
    btnFoundation = 'border-transparent hover:text-stone-600'
  }

  return btnFoundation
}
</script>

<template>
  <div :class="[absolute ? 'absolute' : 'relative']" class="group/dropdown select-none font-medium">
    <!-- dropdown button -->
    <slot name="button">
      <button
        type="button"
        :class="buttonStyle()"
        class="flex w-full cursor-pointer flex-row items-center justify-between rounded-xl border py-2 pl-4 pr-[0.625rem] text-base transition-colors duration-100 ease-in-out on-md:text-sm"
      >
        <slot />
        <span class="material-icons on-md:text-[1rem]"> expand_more </span>
      </button>
    </slot>

    <!-- dropdown content wrapper -->
    <div
      tabindex="0"
      :class="dropdownPosition[props.position]"
      class="invisible absolute z-10 min-w-[120px] scale-[98%] overflow-hidden rounded-xl bg-emerald-50 opacity-0 drop-shadow-xl transition-all group-focus-within/dropdown:visible group-focus-within/dropdown:scale-100 group-focus-within/dropdown:opacity-100"
    >
      <div class="overflow-y-auto p-2">
        <!-- dropdown content -->
        <ul class="flex flex-col gap-1">
          <!-- dropdown content -->
          <li v-for="item in props.list" :key="item" class="w-full">
            <input
              type="radio"
              :name="props.name"
              :id="item + props.name"
              :checked="props.modelValue === item"
              :value="item"
              @input="$emit('update:modelValue', $event.target.value)"
              class="peer absolute -top-10 hidden"
            />
            <label
              :for="item + props.name"
              tabindex="0"
              class="block w-full cursor-pointer whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-stone-800 transition-colors duration-100 ease-in-out hover:bg-stone-950/5 peer-checked:bg-emerald-400 peer-checked:text-emerald-900"
            >
              {{ item }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
