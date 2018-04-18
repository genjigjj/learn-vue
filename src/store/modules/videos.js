import { searchVideo, getFavorites, getVideos } from 'src/api/video'
import Store from 'store'

const state = {
  queryValue: '',
  videosList: [],
  totalVideos: 0,
  vidList: []
}
const getters = {
  getQueryInfo(state) {
    return state
  }
}
const mutations = {
  SET_SEARCH_STATE(state, data) {
    state.queryValue = data.queryValue
    state.videosList = data.videosList
    state.totalVideos = data.totalVideos
  },
  SET_VIDEO_STATE(state, data) {
    state.videosList = data.videosList
    state.totalVideos = data.totalVideos
  },
  SET_VIDEOS_LIST(state, data) {
    state.videosList = data.videosList
    state.totalVideos = data.totalVideos
    state.vidList = data.vidList
  }
}
const actions = {
  // 获取全部视频信息
  getVideoInfo({ commit }, params) {
    const data = {}
    getVideos(params.pageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          data.videosList = respon.response.videos
          data.totalVideos = respon.response.total_videos
          commit('SET_VIDEO_STATE', data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 查询视频信息
  searchVideoInfo({ commit }, params) {
    const data = {}
    data.queryValue = params.queryValue
    searchVideo(params.queryValue, params.pageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          data.videosList = respon.response.videos
          data.totalVideos = respon.response.total_videos
          commit('SET_SEARCH_STATE', data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 获取收藏的视频列表
  getFavoriteVideoList({ commit }, params) {
    const data = {
      videosList: [],
      totalVideos: 0,
      vidList: []
    }
    const vidList = Store.get('videoList')
    if (vidList !== undefined && vidList.length > 0) {
      data.vidList = vidList
      data.totalVideos = vidList.length
      getFavorites(params.vidList.slice((params.pageNo - 1) * 12, params.pageNo * 12))
        .then(
          resultArray => {
            for (const result of resultArray) {
              data.videosList.push(result.data.response.video)
            }
            commit('SET_VIDEOS_LIST', data)
          }
        ).catch((err) => {
          console.log(err)
        })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
