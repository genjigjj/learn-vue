// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router/index'
import 'animate.css/animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import moment from 'moment'

/* Vue.use(VueLazyload, {
  error: './static/error.jpg', // 图片加载失败时使用的图片源
  attempt: 1// 尝试加载次数
})*/
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$moment = moment
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { App }
})

