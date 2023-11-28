<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  }
})

function buttonStyle() {
  let btnFoundation = ''
  let btnColor = ''

  if (props.variant === null) {
    btnFoundation = 'px-4 py-2'
    if (props.color === null) {
      btnColor = 'bg-emerald-950 text-emerald-200 hover:bg-emerald-800 border-emerald-950 hover:border-emerald-800'
    } else if (props.color === 'primary') {
      btnColor = 'bg-emerald-400 text-emerald-900 hover:bg-emerald-500 border-emerald-400 hover:border-emerald-500'
    } else if (props.color === 'error') {
      btnColor = 'bg-red-500 text-red-950 hover:bg-red-600 border-red-500 hover:border-red-600'
    } else if (props.color === 'info') {
      btnColor = 'bg-blue-400 text-blue-950 hover:bg-blue-500 border-blue-400 hover:border-blue-500'
    } else if (props.color === 'warning') {
      btnColor = 'bg-amber-400 text-amber-950 hover:bg-amber-500 border-amber-400 hover:border-amber-500'
    }
  } else if (props.variant === 'ghost') {
    btnFoundation = 'bg-transparent px-4 py-2 hover:bg-emerald-950/5 border-transparent'
    if (props.color === null) {
      btnColor = 'text-emerald-950'
    } else if (props.color === 'primary') {
      btnColor = 'text-emerald-500'
    } else if (props.color === 'error') {
      btnColor = 'text-red-500'
    } else if (props.color === 'info') {
      btnColor = 'text-blue-400'
    } else if (props.color === 'warning') {
      btnColor = 'text-amber-500'
    }
  } else if (props.variant === 'outline') {
    btnFoundation = 'px-4 py-2 border-emerald-400'
    if (props.color === null) {
      btnColor = 'hover:bg-emerald-950 hover:text-emerald-200 text-emerald-800 hover:border-emerald-950'
    } else if (props.color === 'primary') {
      btnColor = 'text-emerald-500 hover:bg-emerald-400 hover:text-emerald-900 hover:border-emerald-400'
    } else if (props.color === 'error') {
      btnColor = 'text-red-500 hover:bg-red-500 hover:text-red-950 hover:border-red-500'
    } else if (props.color === 'info') {
      btnColor = 'text-blue-400 hover:bg-blue-400 hover:text-blue-950 hover:border-blue-400'
    } else if (props.color === 'warning') {
      btnColor = 'text-amber-500 hover:bg-amber-400 hover:text-amber-950 hover:border-amber-400'
    }
  } else if (props.variant === 'icon') {
    btnFoundation = 'justify-center p-2'
    if (props.color === null) {
      btnColor = 'bg-emerald-950 text-emerald-200 hover:bg-emerald-800 border-emerald-950 hover:border-emerald-800'
    } else if (props.color === 'primary') {
      btnColor = 'bg-emerald-400 text-emerald-900 hover:bg-emerald-500 border-emerald-400 hover:border-emerald-500'
    } else if (props.color === 'error') {
      btnColor = 'bg-red-500 text-red-950 hover:bg-red-600 border-red-500 hover:border-red-600'
    } else if (props.color === 'info') {
      btnColor = 'bg-blue-400 text-blue-950 hover:bg-blue-500 border-blue-400 hover:border-blue-500'
    } else if (props.color === 'warning') {
      btnColor = 'bg-amber-400 text-amber-950 hover:bg-amber-500 border-amber-400 hover:border-amber-500'
    }
  } else if (props.variant === 'ghost icon') {
    btnFoundation =
      'justify-center bg-transparent before:transition-all border-transparent before:-top-2 before:-bottom-2 before:-left-2 before:rounded-lg before:-right-2 content-[""] before:absolute relative before:hover:bg-emerald-950/5'
    if (props.color === null) {
      btnColor = 'text-emerald-950'
    } else if (props.color === 'primary') {
      btnColor = 'text-emerald-500'
    } else if (props.color === 'error') {
      btnColor = 'text-red-500'
    } else if (props.color === 'info') {
      btnColor = 'text-blue-400'
    } else if (props.color === 'warning') {
      btnColor = 'text-amber-500'
    }
  }

  return btnFoundation + ' ' + btnColor
}
</script>

<template>
  <button
    :class="buttonStyle()"
    type="button"
    class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center gap-2 rounded-lg border text-start text-base font-medium transition-all on-md:text-sm"
  >
    <slot />
  </button>
</template>

<style scoped></style>
