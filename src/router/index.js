import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import MainView from '../components/main'
import VideoView from '../components/Video'
import CategoriesView from '../components/Categories'
import CollectionsView from '../components/Collections'

Vue.use(Router)

const router = new Router({
/*  mode: 'history',*/
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
      component: CategoriesView
    },
    {
      name: 'collections',
      path: '/collections',
      component: CollectionsView
    },
    {
      name: 'category',
      path: '/category/:c',
      component: MainView,
      beforeEnter: (to, from, next) => {
        store.commit('setPageNo', 1)
        store.commit('setCategory', to.params.c)
        next()
      }
    },
    {
      name: 'collection',
      path: '/collection/:q',
      component: MainView,
      beforeEnter: (to, from, next) => {
        store.commit('setPageNo', 1)
        store.commit('setQueryValue', to.params.q)
        next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('setLock', false)
  next()
})

export default router
