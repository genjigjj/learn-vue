import { getCollections } from '@/api/video'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const state = {
  currentPageNo: 1,
  collections: [],
  totalCollections: 0
}
const getters = {
  collectionsGetter(state) {
    const sliceList = []
    for (let i = 0; i < state.collections.length / 4; i++) {
      sliceList.push(state.collections.slice(i * 4, (i + 1) * 4))
    }
    return sliceList
  }
}
const mutations = {
  setCollectionPageNo(state, pageNo) {
    state.currentPageNo = pageNo
  },
  setCollections(state, collections) {
    state.collections = collections
  },
  setTotalCollections(state, totalCollections) {
    state.totalCollections = totalCollections
  }
}
const actions = {
  getCollectionsInfo({ commit }) {
    NProgress.start()
    getCollections(state.currentPageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('setTotalCollections', respon.response.total_collections)
          commit('setCollections', respon.response.collections)
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

