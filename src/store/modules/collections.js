import { getCollections } from 'src/api/video'

const state = {
  collections: [],
  totalCollections: 0
}
const getters = {
  collectionsGetter(state) {
    return state.collections
  }
}
const mutations = {
  SET_COLLECTIONS_STATE(state, data) {
    state.collections = data.collections
    state.totalCollections = data.totalCollections
  }
}
const actions = {
  getCollectionsInfo({ commit }, params) {
    const data = {}
    getCollections(params.pageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          data.totalCollections = respon.response.total_collections
          data.collections = respon.response.collections
          commit('SET_COLLECTIONS_STATE', data)
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

