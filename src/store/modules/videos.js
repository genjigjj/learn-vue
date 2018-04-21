import { searchVideo, getFavorites, getVideos } from '@/api/video'
import Store from 'store'

const state = {
  queryValue: '',
  pageNo: 1,
  queryParams: {},
  videosList: [],
  totalVideos: 0,
  vidList: []
}
const getters = {
  // 返回三个数组
  videosGetter(state) {
    const sliceList = []
    for (let i = 0; i < 3; i++) {
      sliceList.push(state.videosList.slice(i * 4, (i + 1) * 4))
    }
    return sliceList
  }
}
const mutations = {
  SET_SEARCH_STATE(state, data) {
    state.queryValue = data.queryValue
    state.pageNo = data.pageNo
    state.videosList = data.videosList
    state.totalVideos = data.totalVideos
  },
  SET_VIDEO_STATE(state, data) {
    state.pageNo = data.pageNo
    state.videosList = data.videosList
    state.totalVideos = data.totalVideos
  },
  SET_VIDEOS_LIST(state, data) {
    state.pageNo = data.pageNo
    state.videosList = data.videosList
    state.totalVideos = data.totalVideos
    state.vidList = data.vidList
  },
  SET_PAGENO(state, pageNo) {
    state.pageNo = pageNo
  },
  SET_QUERYVALUE(state, queryValue) {
    state.queryValue = queryValue
  },
  SET_QUERYPARAMS(state, queryParams) {
    state.queryParams = queryParams
  }
}
const actions = {
  // 获取全部视频信息
  getVideoInfo({ commit }, params) {
    getVideos(params)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          const data = {}
          data.pageNo = params.pageNo
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
    searchVideo(params)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          const data = {}
          data.pageNo = params.pageNo
          data.queryValue = params.queryValue
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
    const vidList = Store.get('videoList')
    if (vidList !== undefined && vidList.length > 0) {
      params.vidList = vidList.slice((params.pageNo - 1) * 12, params.pageNo * 12)
      getFavorites(params)
        .then(
          resultArray => {
            const data = {
              videosList: [],
              totalVideos: 0,
              vidList: []
            }
            data.pageNo = params.pageNo
            for (const result of resultArray) {
              data.videosList.push(result.data.response.video)
            }
            data.vidList = vidList
            data.totalVideos = vidList.length
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
