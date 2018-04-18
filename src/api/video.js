import axios from 'axios'

// 获取全部视频
export function getVideos(pageNo) {
  return axios({
    params: {
      limit: 12
    },
    url: 'https://api.avgle.com/v1/videos/' + (pageNo - 1),
    method: 'get'
  })
}

// 查询视频
export function searchVideo(query, pageNo) {
  return axios({
    params: {
      limit: 12
    },
    url: 'https://api.avgle.com/v1/search/' + encodeURIComponent(query) + '/' + (pageNo - 1),
    method: 'get'
  })
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

