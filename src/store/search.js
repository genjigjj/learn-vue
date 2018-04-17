import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    videosList: [],
    totalVideos: 0
  },
  getters: {
    getQueryInfo(state) {
      return state.query
    }
  },
  mutations: {
    SET_STATE(state, data) {
      state.videosList = data.videosList
      state.totalVideos = data.totalVideos
    }
  },
  actions: {
    // 获取视频信息
    searchVideo({ commit }, query) {
      const data = {}
      axios({
        params: {
          limit: 12
        },
        url: 'https://api.avgle.com/v1/search/' + encodeURIComponent(query) + '/0',
        method: 'get'
      }).then((res) => {
        const respon = res.data
        if (respon.success) {
          data.videosList = respon.response.videos
          data.totalVideos = respon.response.total_videos
          commit('SET_STATE', data)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

})
export default store
