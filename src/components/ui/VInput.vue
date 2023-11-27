<script setup>
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  label: String,
  subText: String,
  color: {
    default: null,
    type: String
  },
  variant: {
    default: null,
    type: String
  },
  wide: {
    default: false,
    type: Boolean
  }
})

function textBoxStyles() {
  let border = ''
  let borderFocus = ''

  if (props.variant === null) {
    border = 'border-stone-400'
    if (props.color === null) {
      borderFocus = 'focus:border-stone-600'
    } else if (props.color === 'primary') {
      borderFocus = 'focus:border-emerald-500'
    } else if (props.color === 'info') {
      borderFocus = 'focus:border-blue-500'
    } else if (props.color === 'error') {
      borderFocus = 'focus:border-red-500'
    }
  } else if (props.variant === 'persistent outline') {
    if (props.color === null) {
      border = 'border-stone-300'
    } else if (props.color === 'primary') {
      border = 'border-emerald-500'
    } else if (props.color === 'error') {
      border = 'border-red-500'
    }
  }

  return border + ' ' + borderFocus
}

function labelStyles() {
  let label = ''
  let labelFocus = ''

  if (props.variant === null) {
    label = 'text-stone-600'
  } else if (props.variant === 'persistent outline') {
    if (props.color === null) {
      label = 'text-stone-600'
    } else if (props.color === 'primary') {
      label = 'text-emerald-500'
    } else if (props.color === 'info') {
      label = 'text-blue-500'
    } else if (props.color === 'error') {
      label = 'text-red-500'
    }
  }

  return label + ' ' + labelFocus
}

function subTextStyles() {
  let subText = ''
  if (props.variant === null) {
    subText = 'text-stone-600'
  } else if (props.variant === 'persistent outline') {
    if (props.color === null) {
      subText = 'text-stone-600'
    } else if (props.color === 'primary') {
      subText = 'text-emerald-500'
    } else if (props.color === 'info') {
      subText = 'text-blue-500'
    } else if (props.color === 'error') {
      subText = 'text-red-500'
    }
  }

  return subText
}
</script>

<template>
  <label
    v-if="props.label"
    :class="[
      labelStyles(),
      {
        'w-full': props.wide
      }
    ]"
    class="flex flex-col gap-1 transition-colors duration-100 ease-in-out"
  >
    {{ props.label }}
    <input
      v-bind="$attrs"
      :class="textBoxStyles()"
      class="rounded-lg border bg-transparent px-3 py-2 text-base text-stone-800 outline-none transition-colors ease-in-out on-md:text-sm"
      size="1"
    />
    <span v-if="props.subText" :class="subTextStyles()" class="text-sm">{{ props.subText }}</span>
  </label>

  <div
    v-else
    :class="{
      'w-full': props.wide
    }"
    class="flex flex-col gap-1"
  >
    <input
      v-bind="$attrs"
      :class="textBoxStyles()"
      class="rounded-lg border bg-transparent px-4 py-2 text-base text-stone-200 outline-none transition-colors ease-in-out on-md:text-sm"
      size="1"
    />
    <span v-if="props.subText" :class="subTextStyles()" class="text-sm">{{ props.subText }}</span>
  </div>
</template>

<style scoped>
::-ms-reveal {
  filter: invert(90%);
}
</style>
