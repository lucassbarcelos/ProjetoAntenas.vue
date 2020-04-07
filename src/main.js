import SAutoComplete from '@signainfo/sautocomplete'
import '@signainfo/sautocomplete/dist/sautocomplete.css'
import SConfirmationDialog from '@signainfo/sconfirmationdialog'
import '@signainfo/sconfirmationdialog/dist/sconfirmationdialog.css'
import SLoading from '@signainfo/sloading'
import '@signainfo/sloading/dist/sloading.css'
import SToast from '@signainfo/stoast'
import '@signainfo/stoast/dist/stoast.css'
import VueTheMask from 'vue-the-mask'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/'
import store from './store/'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueTheMask)
Vue.use(SAutoComplete)
Vue.use(SLoading)
Vue.use(SToast)
Vue.use(SConfirmationDialog)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
