<template>
  <div id="main">
    <el-main>
      <el-row :gutter="20" v-if="$route.name !== 'favorites'">
        <el-form>
          <el-form-item :label="labelName">
            <el-col :lg="4" :xs="9">
              <el-select v-model="time" :placeholder="$t('message.timeLine')" @change="select">
                <el-option
                  v-for="(item, index) in optionsA"
                  :key="item.id"
                  :label="getTimeLabel(index)"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :lg="4" :xs="9">
              <el-select v-model="order" :placeholder="$t('message.orderBy')" @change="select">
                <el-option
                  v-for="(item, index) in optionsB"
                  :key="item.id"
                  :label="getOrderLabel(index)"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
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
              <div style="padding: 14px;" :title="item.title">
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
      <el-pagination class="hidden-sm-and-down"
                     background
                     layout="prev, pager, next, jumper"
                     :page-size="12"
                     :page-count="getPageCount"
                     :currentPage.sync="currentPageNo"
                     @current-change="changePage">
      </el-pagination>
      <el-pagination class="hidden-md-and-up"
                     small
                     background
                     layout="prev, pager, next, jumper"
                     :page-size="12"
                     :page-count="getPageCount"
                     :currentPage.sync="currentPageNo"
                     @current-change="changePage">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      optionsA: ['a', 't', 'w', 'm'],
      optionsB: ['bw', 'mr', 'mv', 'mc', 'tr', 'tf', 'lg']
    }
  },
  computed: {
    ...mapState({
      queryValue: state => state.videos.queryValue,
      totalVideos: state => state.videos.totalVideos,
      lang: state => state.videos.lang
    }),
    ...mapGetters({
      sliceList: 'videosGetter'
    }),
    getPageCount() {
      return Math.ceil(this.totalVideos / 12)
    },
    currentPageNo: {
      get() {
        return this.$store.state.videos.currentPageNo
      },
      set(val) {
      }
    },
    order: {
      get() {
        return this.$store.state.videos.queryParams.o
      },
      set(val) {
        this.$store.commit('setOrder', val)
      }
    },
    time: {
      get() {
        return this.$store.state.videos.queryParams.t
      },
      set(val) {
        this.$store.commit('setTime', val)
      }
    },
    labelName() {
      switch (this.$route.name) {
        case 'main':
          return this.$t('message.videos')
        case 'collection':
          return this.$t('message.collections')
        case 'category':
          return this.$t('message.categories')
        case 'search':
          return this.$t('message.search')
      }
    }
  },
  methods: {
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
    // 换页
    changePage(pageNo) {
      this.$store.commit('setPageNo', pageNo)
      switch (this.$route.name) {
        case 'main':
        case 'category':
          this.$store.dispatch('getVideoInfo')
          break
        case 'favorites':
          this.$store.dispatch('getFavoriteVideoList')
          break
        case 'search':
        case 'collection':
          this.$store.dispatch('searchVideoInfo')
          break
      }
    },
    // 编码url
    encodeUrl(url) {
      const wordArray = CryptoJS.enc.Utf8.parse(url)
      return CryptoJS.enc.Base64.stringify(wordArray)
    },
    select() {
      this.$store.commit('setPageNo', 1)
      switch (this.$route.name) {
        case 'main':
        case 'category':
          this.$store.dispatch('getVideoInfo')
          break
        case 'search':
        case 'collection':
          this.$store.dispatch('searchVideoInfo')
          break
      }
    },
    fetchData() {
      this.$store.commit('setLock', true)
      switch (this.$route.name) {
        case 'main':
          this.$store.commit('setCategory', '')
          this.$store.dispatch('getVideoInfo')
          break
        case 'category':
          this.$store.dispatch('getVideoInfo')
          break
        case 'favorites':
          this.$store.dispatch('getFavoriteVideoList')
          break
        case 'search':
        case 'collection':
          this.$store.dispatch('searchVideoInfo')
          break
      }
    },
    // 获取时间label
    getTimeLabel(index) {
      return this.$t(`message.time[${index}]`)
    },
    // 获取排序label
    getOrderLabel(index) {
      return this.$t(`message.order[${index}]`)
    }
  },
  watch: {
    '$route'(to, from) {
      this.$store.commit('setLock', true)
      this.$store.commit('setPageNo', 1)
      switch (to.name) {
        case 'main':
          this.$store.commit('setCategory', '')
          this.$store.dispatch('getVideoInfo')
          break
        case 'favorites':
          this.$store.dispatch('getFavoriteVideoList')
          break
      }
    },
    lang() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
  .el-main .el-row {
    margin-bottom: 10px;
  }

  .el-col {
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .el-form {
    margin-left: 10px;
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
