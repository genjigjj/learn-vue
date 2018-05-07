<template>
  <div id="video">
      <el-main>
        <el-card>
          <iframe referrerpolicy="origin" :src="decodeUrl"
                  :key="vid" sandbox="allow-scripts allow-same-origin"
                  allowfullscreen frameborder="0">
          </iframe>
        </el-card>
        <el-row>
          <el-col>
            <el-button class="button" type="primary" icon="el-icon-back" circle @click="goBack"></el-button>
            <el-button class="button" :type="type" icon="el-icon-star-off" circle @click="collection"></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="temp in sliceList" :key="temp.id">
          <el-col :lg="6" :xs="24" v-for="item in temp" :key="item.id">
            <router-link :to="{
                  name : 'video',
                  query : {
                  q : encodeUrl(item.embedded_url),
                  v : item.vid
                 }}">
              <el-card :body-style="{ padding: '0px' }">
                <video preload="none" loop="loop" :src="item.preview_video_url" :poster="item.preview_url"
                       @mouseover="playPreVideo($event)"
                       @mouseout="reloadVideo($event)" @ended="reloadVideo($event)"></video>
                <div style="padding: 14px;" :title="item.title" >
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
        <div class="show">
          <el-button type="primary" round @click="showMore">{{$t('message.more')}}</el-button>
        </div>
      </el-main>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import moment from 'moment'
import Store from 'store'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'video',
  data() {
    return {
      videoUrl: '',
      vid: '',
      type: '',
      pageNo: 0
    }
  },
  computed: {
    ...mapGetters({
      sliceList: 'relatedVideoGetter'
    }),
    ...mapState({
      lang: state => state.videos.lang
    }),
    decodeUrl() {
      const parsedWordArray = CryptoJS.enc.Base64.parse(this.videoUrl)
      return parsedWordArray.toString(CryptoJS.enc.Utf8)
    }
  },
  watch: {
    '$route'(to, from) {
      this.fetchData()
    },
    lang() {
      this.fetchData()
    }
  },
  methods: {
    // 编码url
    encodeUrl(url) {
      const wordArray = CryptoJS.enc.Utf8.parse(url)
      return CryptoJS.enc.Base64.stringify(wordArray)
    },
    // 收藏
    collection() {
      let videoList = Store.get('videoList')
      if (videoList === undefined) {
        videoList = []
      }
      if (this.type === 'info') {
        videoList.push(this.vid)
        Store.set('videoList', videoList)
        this.type = 'danger'
        this.$message({
          message: this.$t('message.collectionSuccess'),
          type: 'success'
        })
      } else {
        const index = videoList.indexOf(this.vid)
        videoList.splice(index, 1)
        Store.set('videoList', videoList)
        this.type = 'info'
        this.$message({
          message: this.$t('message.removeCollection'),
          type: 'success'
        })
      }
    },
    // 计算发布时间差
    countAddTime(item) {
      return moment(item.addtime, 'X').fromNow()
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
      // 安全暂停播放视频
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          video.pause()
          video.currentTime = 0
        })
          .catch(error => {
            console.log(error)
          })
      }
    },
    goBack() {
      this.$router.back()
    },
    fetchData() {
      this.pageNo = 0
      this.$store.commit('clearRelatedVideoList')
      this.videoUrl = this.$route.query.q
      this.vid = this.$route.query.v
      const videoList = Store.get('videoList')
      if (videoList === undefined || videoList.indexOf(this.vid) === -1) {
        this.type = 'info'
      } else {
        this.type = 'danger'
      }
      this.$store.dispatch('getRelatedVideoList', {
        page: 0,
        vid: this.$route.query.v
      })
    },
    showMore() {
      this.$store.dispatch('getRelatedVideoList', {
        page: ++this.pageNo,
        vid: this.vid
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 480px;
    overflow: hidden;
  }

  .button {
    float: right;
    margin: 10px;
  }

  .el-main .el-row {
    margin-bottom: 10px;
  }

  .el-col {
    border-radius: 4px;
    margin-bottom: 10px;
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

  .el-card span {
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

  .el-icon-star-on {
    margin-right: 4px;
    color: #f35958
  }

  .el-icon-view {
    margin-left: 4px;
  }

  .show{
    text-align: center;
  }
</style>
