import Vue from 'vue'
import Router from 'vue-router'
import IndexView from '../components/Index'
import VideoView from '../components/Video'
import FavoriteView from '../components/Favorite'
import SearchView from '../components/Search'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: IndexView
    },
    {
      name: 'video',
      path: '/video',
      component: VideoView
    },
    {
      name: 'favorites',
      path: '/favorites',
      component: FavoriteView
    }, {
      name: 'search',
      path: '/search',
      component: SearchView
    }
  ]
})
