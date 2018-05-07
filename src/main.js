// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router/index'
import 'animate.css/animate.css'
import i18n from './lang/i18n'

Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { App },
  i18n: i18n
})

