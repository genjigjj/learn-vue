import axios from 'axios'

// 获取全部视频
export function getVideos(params, pageNo) {
  const queryParams = {}
  queryParams.limit = params.limit
  if (params.c !== undefined && params.c !== '') {
    queryParams.c = params.c
  }
  if (params.t !== undefined && params.t !== '') {
    queryParams.t = params.t
  }
  if (params.o !== undefined && params.o !== '') {
    queryParams.o = params.o
  }
  return axios({
    params: queryParams,
    url: 'https://api.avgle.com/v1/videos/' + (pageNo - 1),
    method: 'get'
  })
}

// 查询视频
export function searchVideo(params, queryValue, currentPageNo) {
  if (queryValue !== undefined && queryValue !== '') {
    const queryParams = {}
    queryParams.limit = params.limit
    if (params.t !== undefined && params.t !== '') {
      queryParams.t = params.t
    }
    if (params.o !== undefined && params.o !== '') {
      queryParams.o = params.o
    }
    return axios({
      params: queryParams,
      url: 'https://api.avgle.com/v1/search/' + encodeURIComponent(queryValue) + '/' + (currentPageNo - 1),
      method: 'get'
    })
  } else {
    /* eslint-disable */
    return Promise.reject('error')
  }
}

// 通过id获取视频信息
export function getFavorites(vidList) {
  const axiosList = []
  for (const item of vidList) {
    const tempAxios = axios.get('https://api.avgle.com/v1/video/' + item)
    axiosList.push(tempAxios)
  }
  return axios.all(axiosList)
}

// 获取分类
export function getCategories() {
  return axios.get('https://api.avgle.com/v1/categories')
}

// 获取收藏
export function getCollections(pageNo) {
  return axios({
    params: {
      limit: 12
    },
    url: 'https://api.avgle.com/v1/collections/' + (pageNo - 1),
    method: 'get'
  })
}

// 获取相关视频列表
export function getRelatedVideoInfo(queryValue) {
  return axios({
    params: {
      page: queryValue.page,
      vid: queryValue.vid
    },
    url: 'http://127.0.0.1:3000/api/vids',
    method: 'get'
  })
}

