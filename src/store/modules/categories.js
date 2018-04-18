import { getCategories } from '@/api/video'

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
  SET_CATEGORIES_STATE(state, data) {
    state.categories = data
  }
}
const actions = {
  getCategoriesInfo({ commit }) {
    getCategories()
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('SET_CATEGORIES_STATE', respon.response.categories)
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

