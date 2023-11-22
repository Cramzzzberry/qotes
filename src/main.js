import './assets/styles/index.css'
import './assets/styles/transitions.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//components
import VButton from '@/components/ui/VButton.vue'
import VSelect from '@/components/ui/VSelect.vue'
import VModal from '@/components/ui/VModal.vue'
import VInput from '@/components/ui/VInput.vue'
import VSheetList from '@/components/ui/VSheetList.vue'
import VLoadingSheets from '@/components/ui/VLoadingSheets.vue'
import VDialog from '@/components/ui/VDialog.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

app
  .component('VButton', VButton)
  .component('VSelect', VSelect)
  .component('VModal', VModal)
  .component('VInput', VInput)
  .component('VSheetList', VSheetList)
  .component('VLoadingSheets', VLoadingSheets)
  .component('VDialog', VDialog)
