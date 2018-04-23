import { getCategories } from '@/api/video'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const state = {
  categories: []
}
const getters = {
  categoriesGetter(state) {
    const sliceList = []
    for (let i = 0; i < 6; i++) {
      sliceList.push(state.categories.slice(i * 4, (i + 1) * 4))
    }
    return sliceList
  }
}
const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  }
}
const actions = {
  getCategoriesInfo({ commit }) {
    NProgress.start()
    getCategories()
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('setCategories', respon.response.categories)
          NProgress.done()
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

