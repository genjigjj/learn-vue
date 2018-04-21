import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import MainView from '../components/main'
import VideoView from '../components/Video'
import CategoriesView from '../components/Categories'
import CollectionsView from '../components/Collections'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'main',
      path: '/',
      component: MainView
    },
    {
      name: 'video',
      path: '/video',
      component: VideoView
    },
    {
      name: 'favorites',
      path: '/favorites',
      component: MainView
    },
    {
      name: 'search',
      path: '/search',
      component: MainView
    },
    {
      name: 'categories',
      path: '/categories',
      component: CategoriesView,
      beforeEnter: (to, from, next) => {
        store.commit('SET_PAGENO', 1)
        next()
      }
    },
    {
      name: 'collections',
      path: '/collections',
      component: CollectionsView,
      beforeEnter: (to, from, next) => {
        store.commit('SET_PAGENO', 1)
        next()
      }
    },
    {
      name: 'category',
      path: '/category/:c',
      component: MainView
    },
    {
      name: 'collection',
      path: '/collection/:c',
      component: MainView
    }
  ]
})
