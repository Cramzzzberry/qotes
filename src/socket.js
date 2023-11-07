import { reactive } from 'vue'
import { useToast } from '@/composables/toast'
import { io } from 'socket.io-client'

const toast = useToast()

export const state = reactive({
  connected: false
})

const URL = import.meta.env.VITE_API_SERVER_URL

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('toast', (msg, duration) => {
  toast.addToast({
    msg: msg,
    duration: duration
  })
})
