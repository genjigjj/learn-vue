import { searchVideo, getFavorites, getVideos } from '@/api/video'
import Store from 'store'

const state = {
  currentPageNo: 1,
  queryValue: '',
  queryParams: {
    limit: 12, // 每页条数
    t: '', // 时间
    o: '', // 排序
    c: '' // 分类
  },
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
  setPageNo(state, pageNo) {
    state.currentPageNo = pageNo
  },
  setQueryValue(state, queryValue) {
    state.queryValue = queryValue
  },
  setQueryParams(state, queryParams) {
    state.queryParams = queryParams
  },
  setTime(state, time) {
    state.queryParams.t = time
  },
  setOrder(state, order) {
    state.queryParams.o = order
  },
  setCategory(state, category) {
    state.queryParams.c = category
  },
  setVideosList(state, videosList) {
    state.videosList = videosList
  },
  setTotalVideos(state, totalVideos) {
    state.totalVideos = totalVideos
  },
  setVidList(state, vidList) {
    state.vidList = vidList
  }
}
const actions = {
  // 获取全部视频信息
  getVideoInfo({ commit }) {
    getVideos(state.queryParams, state.currentPageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('setVideosList', respon.response.videos)
          commit('setTotalVideos', respon.response.total_videos)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 查询视频信息
  searchVideoInfo({ commit }) {
    searchVideo(state.queryParams, state.queryValue, state.currentPageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('setVideosList', respon.response.videos)
          commit('setTotalVideos', respon.response.total_videos)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 获取收藏的视频列表
  getFavoriteVideoList({ commit }) {
    const allVidList = Store.get('videoList')
    if (allVidList !== undefined && allVidList.length > 0) {
      const vidList = allVidList.slice((state.currentPageNo - 1) * 12, state.currentPageNo * 12)
      getFavorites(vidList)
        .then(
          resultArray => {
            const tempVideosList = []
            for (const result of resultArray) {
              tempVideosList.push(result.data.response.video)
            }
            // commit('setVidList', vidList)
            commit('setTotalVideos', allVidList.length)
            commit('setVideosList', tempVideosList)
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
