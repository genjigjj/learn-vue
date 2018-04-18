import { getCategories } from 'src/api/video'

const state = {
  categories: []
}
const getters = {
  categoriesGetter(state) {
    return state.categories
  }
}
const mutations = {
  SET_CATEGORIES_STATE(state, data) {
    state.categories = data.categories
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

