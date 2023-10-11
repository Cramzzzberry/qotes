import './assets/styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//components
import VButton from '@/components/ui/VButton.vue'
import VDropdownList from '@/components/ui/VDropdownList.vue'
import VModal from '@/components/ui/VModal.vue'
import VTextBox from '@/components/ui/VTextBox.vue'
import VSheet from '@/components/ui/VSheet.vue'
import VSheetList from '@/components/ui/VSheetList.vue'
import VLoadingSheets from '@/components/ui/VLoadingSheets.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

app
  .component('VButton', VButton)
  .component('VDropdownList', VDropdownList)
  .component('VModal', VModal)
  .component('VTextBox', VTextBox)
  .component('VSheet', VSheet)
  .component('VSheetList', VSheetList)
  .component('VLoadingSheets', VLoadingSheets)
