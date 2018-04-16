<template>
  <div id="index">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in filterList(0,3)" :key="item.id">
          <router-link :to="{
                  name : 'video',
                  query : {
                  q : encodeUrl(item.embedded_url),
                  v : item.vid
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <video loop="loop" :src="item.preview_video_url" :poster="item.preview_url"
                     @mouseover="playPreVideo($event)"
                     @mouseout="reloadVideo($event)" @ended="reloadVideo($event)"></video>
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{countAddTime(item)}}</time>
                </div>
                <div class="bottom clearfix">
                  <div class="view-number">{{item.viewnumber}}<i class="el-icon-view"></i></div>
                  <div class="like-rate"><i class="el-icon-star-on"></i>{{countLikeRate(item)}}%</div>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in filterList(4,7)" :key="item.id">
          <router-link :to="{
                 name : 'video',
                  query : {
                  q : encodeUrl(item.embedded_url),
                  v : item.vid
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <video loop="loop" :src="item.preview_video_url" :poster="item.preview_url"
                     @mouseover="playPreVideo($event)"
                     @mouseout="reloadVideo($event)" @ended="reloadVideo($event)"></video>
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{countAddTime(item)}}</time>
                </div>
                <div class="bottom clearfix">
                  <div class="view-number">{{item.viewnumber}}<i class="el-icon-view"></i></div>
                  <div class="like-rate"><i class="el-icon-star-on"></i>{{countLikeRate(item)}}%</div>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in filterList(8,11)" :key="item.id">
          <router-link :to="{
                 name : 'video',
                 query : {
                 q : encodeUrl(item.embedded_url),
                 v : item.vid
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <video loop="loop" :src="item.preview_video_url" :poster="item.preview_url"
                     @mouseover="playPreVideo($event)"
                     @mouseout="reloadVideo($event)" @ended="reloadVideo($event)"></video>
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{countAddTime(item)}}</time>
                </div>
                <div class="bottom clearfix">
                  <div class="view-number">{{item.viewnumber}}<i class="el-icon-view"></i></div>
                  <div class="like-rate"><i class="el-icon-star-on"></i>{{countLikeRate(item)}}%</div>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="12"
        :page-count="getPageCount"
        :current-page.sync="currentPage"
        @current-change="changePage">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import Store from 'store'

export default {
  name: 'index',
  data() {
    return {
      videosList: [], // 视频总列表
      videos: [],
      totalVideos: 0, // 总视频数
      currentPage: 1 // 当前页数
    }
  },
  computed: {
    getPageCount() {
      const pageCount = Math.ceil(this.totalVideos / 12)
      return pageCount
    }
  },
  methods: {
    // 计算发布时间差
    countAddTime(item) {
      return this.$moment(item.addtime, 'X').fromNow()
    },
    // 计算喜欢该视频人数所占百分比
    countLikeRate(item) {
      const rate = (item.likes) / ((item.likes + item.dislikes) === 0 ? 1 : (item.likes + item.dislikes)) * 100
      return Math.floor(rate)
    },
    // 播放视频
    playPreVideo(event) {
      const video = event.currentTarget
      video.play()
    },
    // 重新加载
    reloadVideo(event) {
      const video = event.currentTarget
      video.load()
    },
    filterList(begin, end) {
      return this.videosList.slice(begin, end + 1)
    },
    changePage(pageNo) {
      this.videos = this.videosList.slice((pageNo - 1) * 12, pageNo * 12)
    },
    encodeUrl(url) {
      const wordArray = CryptoJS.enc.Utf8.parse(url)
      return CryptoJS.enc.Base64.stringify(wordArray)
    }
  },
  mounted: function() {
    const vidList = Store.get('videoList')
    if (vidList !== undefined) {
      this.totalVideos = vidList.length
      const vList = []
      for (const item of vidList) {
        this.$axios({
          url: 'https://api.avgle.com/v1/video/' + item,
          method: 'get'
        }).then((res) => {
          const respon = res.data
          if (respon.success) {
            const video = respon.response.video
            vList.push(video)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      console.log(vList)
      this.videosList = [].concat(vList)
      this.videos = [].concat(vList.slice(0, 12))
    }
  }
}
</script>

<style scoped>
  .el-main .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .time {
    font-size: 13px;
    color: #555;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .view-number {
    padding: 0;
    float: left;
    color: #aaa;
    font-size: 13px;
  }

  .like-rate {
    padding: 0;
    float: right;
    color: #777;
    font-weight: 700;
  }

  video {
    width: 100%;
    display: block;
    cursor: pointer;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  span {
    color: #2a9fd6;
    font-size: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    text-decoration: none;
  }

  .el-pagination {
    text-align: center;
  }

  .el-icon-star-on {
    margin-right: 4px;
    color: #f35958
  }

  .el-icon-view {
    margin-left: 4px;
  }
</style>
