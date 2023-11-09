<script setup>
import { ref } from 'vue'

const props = defineProps({
  btnStyle: {
    type: String,
    default: 'default'
  },
  colorState: {
    type: String,
    default: 'default'
  }
})

const btnClass = ref('')
function makeClass() {
  let btnStyle = ''
  let colorState = ''

  //btn style
  switch (props.btnStyle) {
    case 'default':
      btnStyle = 'px-4 py-2'

      //color state
      if (props.colorState === 'default' || props.colorState === 'success') {
        colorState = 'bg-emerald-400 text-emerald-950 hover:bg-emerald-500 border-emerald-400 hover:border-emerald-500'
      } else if (props.colorState === 'error') {
        colorState = 'bg-red-500 text-red-950 hover:bg-red-600 border-red-500 hover:border-red-600'
      } else if (props.colorState === 'info') {
        colorState = 'bg-blue-400 text-blue-950 hover:bg-blue-500 border-blue-400 hover:border-blue-500'
      } else if (props.colorState === 'warning') {
        colorState = 'bg-amber-400 text-amber-950 hover:bg-amber-500 border-amber-400 hover:border-amber-500'
      }
      break
    case 'ghost':
      btnStyle = 'bg-transparent px-4 py-2 hover:bg-stone-700 border-transparent'

      //color state
      if (props.colorState === 'default') {
        colorState = 'text-stone-400 hover:text-stone-300'
      } else if (props.colorState === 'success') {
        colorState = 'text-emerald-400'
      } else if (props.colorState === 'error') {
        colorState = 'text-red-500'
      } else if (props.colorState === 'info') {
        colorState = 'text-blue-400'
      } else if (props.colorState === 'warning') {
        colorState = 'text-amber-400'
      }
      break
    case 'icon':
      btnStyle = 'justify-center p-2'

      //color state
      if (props.colorState === 'default' || props.colorState === 'success') {
        colorState = 'bg-emerald-400 text-emerald-950 hover:bg-emerald-500 border-emerald-400 hover:border-emerald-500'
      } else if (props.colorState === 'error') {
        colorState = 'bg-red-500 text-red-950 hover:bg-red-600 border-red-500 hover:border-red-600'
      } else if (props.colorState === 'info') {
        colorState = 'bg-blue-400 text-blue-950 hover:bg-blue-500 border-blue-400 hover:border-blue-500'
      } else if (props.colorState === 'warning') {
        colorState = 'bg-amber-400 text-amber-950 hover:bg-amber-500 border-amber-400 hover:border-amber-500'
      }
      break
    case 'icon-ghost':
      btnStyle = 'justify-center bg-transparent p-2 border-transparent'

      //color state
      if (props.colorState === 'default') {
        colorState = 'text-stone-400 hover:text-stone-300 hover:bg-stone-700'
      } else if (props.colorState === 'success') {
        colorState = 'text-emerald-400 hover:bg-stone-600'
      } else if (props.colorState === 'error') {
        colorState = 'text-red-500 hover:bg-stone-700'
      } else if (props.colorState === 'info') {
        colorState = 'text-blue-400 hover:bg-stone-600'
      } else if (props.colorState === 'warning') {
        colorState = 'text-amber-400 hover:bg-stone-600'
      }
      break
    case 'outlined':
      btnStyle = 'px-4 py-2 border-stone-600'

      //color state
      if (props.colorState === 'default') {
        colorState = 'text-stone-300 hover:bg-stone-600'
      } else if (props.colorState === 'success') {
        colorState = 'text-emerald-400 hover:bg-stone-600'
      } else if (props.colorState === 'error') {
        colorState = 'text-red-500 hover:bg-stone-600'
      } else if (props.colorState === 'info') {
        colorState = 'text-blue-400 hover:bg-stone-600'
      } else if (props.colorState === 'warning') {
        colorState = 'text-amber-400 hover:bg-stone-600'
      }
      break
  }

  return btnStyle + ' ' + colorState
}

btnClass.value = makeClass()
</script>

<template>
  <button
    :class="btnClass"
    type="button"
    class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center gap-2 rounded-lg border text-start text-base font-medium transition-all"
  >
    <slot />
  </button>
</template>

<style scoped></style>
