import { searchVideo, getFavorites, getVideos } from '@/api/video'
import Store from 'store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import { getRelatedVideoInfo } from '../../api/video'
// Progress 进度条样式

const state = {
  lock: false,
  currentPageNo: 1,
  queryValue: '',
  queryParams: {
    limit: 12, // 每页条数
    t: '', // 时间
    o: '', // 排序
    c: '' // 分类
  },
  videosList: [],
  relatedVideoList: [],
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
  },

  // 返回两个数组
  relatedVideoGetter(state) {
    const sliceList = []
    for (let i = 0; i < 2; i++) {
      sliceList.push(state.relatedVideoList.slice(i * 4, (i + 1) * 4))
    }
    return sliceList
  }
}
const mutations = {
  setLock(state, lock) {
    state.lock = lock
  },
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
  },
  setRelatedList(state, relatedVideoList) {
    state.relatedVideoList = relatedVideoList
  }
}
const actions = {
  // 获取全部视频信息
  getVideoInfo({ commit }) {
    NProgress.start()
    getVideos(state.queryParams, state.currentPageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('setVideosList', respon.response.videos)
          commit('setTotalVideos', respon.response.total_videos)
          NProgress.done()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 查询视频信息
  searchVideoInfo({ commit }) {
    NProgress.start()
    searchVideo(state.queryParams, state.queryValue, state.currentPageNo)
      .then((res) => {
        const respon = res.data
        if (respon.success) {
          commit('setVideosList', respon.response.videos)
          commit('setTotalVideos', respon.response.total_videos)
          NProgress.done()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 获取收藏的视频列表
  getFavoriteVideoList({ commit }) {
    NProgress.start()
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
            NProgress.done()
          }
        ).catch((err) => {
          console.log(err)
        })
    }
  },
  // 获取相关视频
  getRelatedVideoList({ commit }, queryValue) {
    NProgress.start()
    getRelatedVideoInfo(queryValue)
      .then(res => {
        const tempVideosList = []
        if (res.data.status === 1) {
          for (const result of res.data.videosList) {
            tempVideosList.push(result.response.video)
          }
        }
        commit('setRelatedList', tempVideosList)
        NProgress.done()
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
