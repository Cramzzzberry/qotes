import './assets/styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//components
import VButton from '@/components/ui/VButton.vue'
import VCompactList from '@/components/ui/VCompactList.vue'
import VDropdownList from '@/components/ui/VDropdownList.vue'
import VModal from '@/components/ui/VModal.vue'
import VTextBox from '@/components/ui/VTextBox.vue'
import VSheet from '@/components/ui/VSheet.vue'
import VSheetList from '@/components/ui/VSheetList.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

app
  .component('VButton', VButton)
  .component('VCompactList', VCompactList)
  .component('VDropdownList', VDropdownList)
  .component('VModal', VModal)
  .component('VTextBox', VTextBox)
  .component('VSheet', VSheet)
  .component('VSheetList', VSheetList)
