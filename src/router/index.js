import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '../components/Login'
import SignView from '../components/Sign'
import MainView from '../components/Main'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      component:LoginView
    },
    {
      path:'/sign',
      component:SignView
    },
    {
      path:'/login',
      component:LoginView
    },
    {
      path:'/main',
      component:MainView
    }
  ]
})
