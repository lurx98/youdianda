import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import '@/vant'
import 'amfe-flexible'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
