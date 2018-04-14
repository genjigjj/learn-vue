// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import 'animate.css/animate.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import moment from "moment"


Vue.use(VueLazyload);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app/>',
  components: { App }
})

