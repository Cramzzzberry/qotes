import './assets/styles/index.css'
import './assets/styles/transitions.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//components
import VButton from '@/components/ui/VButton.vue'
import VDropdown from '@/components/ui/VDropdown.vue'
import VModal from '@/components/ui/VModal.vue'
import VTextBox from '@/components/ui/VTextBox.vue'
import VSheetList from '@/components/ui/VSheetList.vue'
import VLoadingSheets from '@/components/ui/VLoadingSheets.vue'
import VFormCreateSheet from '@/components/ui/VFormCreateSheet.vue'
import VCheckbox from '@/components/ui/VCheckbox.vue'
import VToast from '@/components/ui/VToast.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

app
  .component('VButton', VButton)
  .component('VDropdown', VDropdown)
  .component('VModal', VModal)
  .component('VTextBox', VTextBox)
  .component('VSheetList', VSheetList)
  .component('VLoadingSheets', VLoadingSheets)
  .component('VFormCreateSheet', VFormCreateSheet)
  .component('VCheckbox', VCheckbox)
  .component('VToast', VToast)
