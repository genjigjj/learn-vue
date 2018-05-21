import { searchVideo, getFavorites, getVideos, getRelatedVideoInfo, addFavorite, removeFavorite, getVidList, isContain } from '@/api/video'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import Vue from '@/main'
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
  vidList: [],
  lang: '',
  isMyFavorite: 'info'
}
const getters = {
  // 返回三个数组
  videosGetter(state) {
    const sliceList = []
    for (let i = 0; i < state.videosList.length / 4; i++) {
      sliceList.push(state.videosList.slice(i * 4, (i + 1) * 4))
    }
    return sliceList
  },

  // 返回两个数组
  relatedVideoGetter(state) {
    const sliceList = []
    for (let i = 0; i < state.relatedVideoList.length / 4; i++) {
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
    state.relatedVideoList = [...state.relatedVideoList, ...relatedVideoList]
  },
  clearRelatedVideoList(state) {
    state.relatedVideoList = []
  },
  setLang(state, lang) {
    state.lang = lang
  },
  setIsMyFavorite(state, isMyFavorite) {
    state.isMyFavorite = isMyFavorite
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
        }
        NProgress.done()
      })
      .catch((err) => {
        console.log(err)
        NProgress.done()
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
        }
        NProgress.done()
      })
      .catch((err) => {
        console.log(err)
        NProgress.done()
      })
  },
  // 获取收藏的视频列表
  async getFavoriteVideoList({ commit }) {
    NProgress.start()
    const res = await getVidList((state.currentPageNo - 1) * 12, state.currentPageNo * 12)
    if (res.data.status === 1) {
      getFavorites(res.data.vidList)
        .then(
          resultArray => {
            const tempVideosList = []
            for (const result of resultArray) {
              if (result.data.success) {
                tempVideosList.push(result.data.response.video)
              }
            }
            commit('setTotalVideos', res.data.total)
            commit('setVideosList', tempVideosList)
            NProgress.done()
          }
        ).catch((err) => {
          console.log(err)
          NProgress.done()
        })
    } else {
      commit('setVideosList', [])
      commit('setTotalVideos', 0)
      NProgress.done()
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
          commit('setRelatedList', tempVideosList)
        } else {
          Message({
            message: Vue.$t('message.noMoreVideos'),
            type: 'warning',
            center: true
          })
        }
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        Message({
          message: Vue.$t('message.noMoreVideos'),
          type: 'warning',
          center: true
        })
        NProgress.done()
      })
  },
  // 是否在收藏列表中
  isFavorite({ commit }, vid) {
    isContain(vid)
      .then(res => {
        if (res.data.status === 1) {
          commit('setIsMyFavorite', 'danger')
        } else {
          commit('setIsMyFavorite', 'info')
        }
      })
  },
  // 添加到收藏中
  addToFavorite({ commit }, vid) {
    addFavorite(vid)
      .then(res => {
        if (res.data.status === 1) {
          commit('setIsMyFavorite', 'danger')
          Message({
            message: Vue.$t('message.collectionSuccess'),
            type: 'success',
            center: true
          })
        } else {
          Message({
            message: Vue.$t('message.collectionFail'),
            type: 'warning',
            center: true
          })
        }
      })
  },
  // 从收藏中移除
  removeFromFavorite({ commit }, vid) {
    removeFavorite(vid)
      .then(res => {
        if (res.data.status === 1) {
          commit('setIsMyFavorite', 'info')
          Message({
            message: Vue.$t('message.removeSuccess'),
            type: 'success',
            center: true
          })
        } else {
          Message({
            message: Vue.$t('message.removeFail'),
            type: 'warning',
            center: true
          })
        }
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
