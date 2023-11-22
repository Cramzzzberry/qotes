import { reactive, ref, computed } from 'vue'

export const selectionStore = reactive({
  isFilled: false,
  length: 0,
  list: [],
  organizedList: []
})

export const refreshStore = ref(false)

export const scrollStore = ref(null)

export const profileStore = reactive({
  email: '',
  firstName: '',
  lastName: '',
  initials: computed(() => {
    return profileStore.firstName.split('')[0] + profileStore.lastName.split('')[0]
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
