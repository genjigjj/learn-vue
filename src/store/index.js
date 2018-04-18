import Vue from 'vue'
import Vuex from 'vuex'
import videos from './modules/videos'
import categories from './modules/categories'
import collections from './modules/collections'

Vue.use(Vuex)

export default {
  modules: {
    videos,
    categories,
    collections
  }
}
