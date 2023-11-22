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
  btnColor: {
    type: String,
    default: null
  },
  listColor: {
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
  bottomEnd: 'right-0 top-[calc(100%+8px)]',
  top: 'bottom-[calc(100%+8px)] left-0',
  topEnd: 'bottom-[calc(100%+8px)] right-0',
  right: 'left-[calc(100%+8px)] top-0',
  rightEnd: 'bottom-0 left-[calc(100%+8px)]',
  left: 'right-[calc(100%+8px)] top-0',
  leftEnd: 'bottom-0 right-[calc(100%+8px)]'
}

function buttonStyle() {
  let btnFoundation = ''
  let btnColor = ''

  if (props.variant === null) {
    btnFoundation = 'px-4 py-2 border-stone-400'
    if (props.btnColor === null) {
      btnColor = 'hover:border-stone-500 text-stone-800'
    } else if (props.btnColor === 'primary') {
      btnColor = 'text-emerald-500 hover:border-emerald-500'
    } else if (props.btnColor === 'error') {
      btnColor = 'text-red-500 hover:border-red-500'
    } else if (props.btnColor === 'info') {
      btnColor = 'text-blue-400 hover:border-blue-400'
    } else if (props.btnColor === 'warning') {
      btnColor = 'text-amber-500 hover:border-amber-400'
    }
  } else if (props.variant === 'ghost') {
    btnFoundation = 'border-transparent hover:text-stone-600'
  }

  return btnFoundation + ' ' + btnColor
}

function selectedStyle() {
  let selectedColor = ''

  if (props.listColor === null) {
    selectedColor = 'peer-checked:bg-stone-800 peer-checked:text-stone-200'
  } else if (props.listColor === 'primary') {
    selectedColor = 'peer-checked:bg-emerald-400 peer-checked:text-emerald-900'
  } else if (props.listColor === 'error') {
    selectedColor = 'peer-checked:bg-red-500 peer-checked:text-red-900'
  } else if (props.listColor === 'info') {
    selectedColor = 'peer-checked:bg-blue-400 peer-checked:text-blue-900'
  } else if (props.listColor === 'warning') {
    selectedColor = 'peer-checked:bg-amber-500 peer-checked:text-amber-900'
  }

  return selectedColor
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
      class="invisible absolute z-10 min-w-[120px] scale-[98%] overflow-y-auto rounded-xl bg-stone-100 p-2 opacity-0 drop-shadow-xl transition-all group-focus-within/dropdown:visible group-focus-within/dropdown:scale-100 group-focus-within/dropdown:opacity-100"
    >
      <!-- dropdown content -->
      <ul class="flex flex-col gap-1 overflow-y-auto">
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
            :class="selectedStyle()"
            class="block w-full cursor-pointer whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-stone-800 transition-colors duration-100 ease-in-out hover:bg-stone-200"
          >
            {{ item }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
