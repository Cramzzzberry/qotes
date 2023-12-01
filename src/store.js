import { reactive, ref, computed } from 'vue'

export const selectionStore = reactive({
  isFilled: false,
  length: 0,
  list: [],
  organizedList: []
})

export const refreshStore = ref(false)

export const scrollStore = ref(null)

export const toastStore = reactive({
  list: [],
  add(msg) {
    this.list.push(msg)
  }
})

export const profileStore = reactive({
  email: '',
  firstName: '',
  lastName: '',
  initials: computed(() => {
    let firstLetter
    let lastLetter

    if (profileStore.firstName.split('')[0] === undefined) {
      firstLetter = ''
    } else {
      firstLetter = profileStore.firstName.split('')[0]
    }

    if (profileStore.lastName.split('')[0] === undefined) {
      lastLetter = ''
    } else {
      lastLetter = profileStore.lastName.split('')[0]
    }

    return firstLetter + lastLetter
  }),
  modalState: false,
  deleteDialogState: false,
  toggleModal() {
    this.modalState = !this.modalState
  },
  toggleDeleteDialog() {
    this.deleteDialogState = !this.deleteDialogState
  }
})
