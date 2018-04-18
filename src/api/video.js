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
    url: 'https://api.avgle.com/v1/search/' + encodeURIComponent(query) + pageNo,
    method: 'get'
  })
}

export function getFavorites(vidList) {
  const axiosList = []
  for (const item of vidList) {
    const tempAxios = this.$axios.get('https://api.avgle.com/v1/video/' + item)
    axiosList.push(tempAxios)
  }
  return axios.all(axiosList)
}
