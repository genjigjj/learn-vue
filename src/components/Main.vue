<template>
  <div id="main">
    <el-main>
      <el-row :gutter="20" v-if="$route.name !== 'favorites'">
        <el-form>
          <el-form-item :label="labelName">
            <el-col :span="4">
              <el-select v-model="time" placeholder="TimeLine" @change="select">
                <el-option
                  v-for="item in optionsA"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="order" placeholder="OrderBy" @change="select">
                <el-option
                  v-for="item in optionsB"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[0]" :key="item.id">
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
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[1]" :key="item.id">
          <router-link :to="{
                 name : 'video',
                  query : {
                  q : encodeUrl(item.embedded_url),
                  v : item.vid
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <video preload="none"  loop="loop" :src="item.preview_video_url" :poster="item.preview_url"
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
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[2]" :key="item.id">
          <router-link :to="{
                 name : 'video',
                 query : {
                 q : encodeUrl(item.embedded_url),
                 v : item.vid
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <video preload="none"  loop="loop" :src="item.preview_video_url" :poster="item.preview_url"
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
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      optionsA: [
        {
          value: 'a',
          label: 'All'
        },
        {
          value: 't',
          label: 'Added Today'
        },
        {
          value: 'w',
          label: 'Added This Week'
        },
        {
          value: 'm',
          label: 'Added This Month'
        }],
      optionsB: [
        {
          value: 'bw',
          label: 'Being Watched'
        },
        {
          value: 'mr',
          label: 'Most Recent'
        },
        {
          value: 'mv',
          label: 'Most View'
        },
        {
          value: 'mc',
          label: 'Most Commented'
        },
        {
          value: 'tr',
          label: 'Top Rated'
        },
        {
          value: 'tf',
          label: 'Top Favorites'
        },
        {
          value: 'lg',
          label: 'Longest'
        }],
      order: '',
      time: ''
    }
  },
  computed: {
    ...mapState({
      queryValue: state => state.videos.queryValue,
      totalVideos: state => state.videos.totalVideos
    }),
    ...mapGetters({
      sliceList: 'videosGetter'
    }),
    getPageCount() {
      return Math.ceil(this.totalVideos / 12)
    },
    currentPageNo: {
      get() {
        return this.$store.state.videos.pageNo
      },
      set(val) {
      }
    },
    labelName() {
      switch (this.$route.name) {
        case 'main':
          return 'Videos'
        case 'collection':
          return 'Collections'
        case 'category':
          return 'Categories'
        case 'search':
          return 'Search'
      }
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
      switch (this.$route.name) {
        case 'main':
          this.$store.dispatch('getVideoInfo', { pageNo: pageNo, t: this.time, o: this.order })
          break
        case 'category':
          this.$store.dispatch('getVideoInfo', { pageNo: pageNo, c: this.$route.params.c, t: this.time, o: this.order })
          break
        case 'favorites':
          this.$store.dispatch('getFavoriteVideoList', { pageNo: pageNo })
          break
        case 'search':
          this.$store.dispatch('searchVideoInfo', { pageNo: pageNo, queryValue: this.queryValue, t: this.time, o: this.order })
          break
        case 'collection':
          this.$store.dispatch('searchVideoInfo', { queryValue: this.$route.params.c, pageNo: pageNo, t: this.time, o: this.order })
          break
      }
    },
    // 编码url
    encodeUrl(url) {
      const wordArray = CryptoJS.enc.Utf8.parse(url)
      return CryptoJS.enc.Base64.stringify(wordArray)
    },
    select() {
      const queryParams = {
        t: this.time,
        o: this.order
      }
      this.$store.commit('SET_QUERYPARAMS', queryParams)
      switch (this.$route.name) {
        case 'main':
          this.$store.dispatch('getVideoInfo', { pageNo: 1, t: this.time, o: this.order })
          break
        case 'category':
          this.$store.dispatch('getVideoInfo', { pageNo: 1, c: this.$route.params.c, t: this.time, o: this.order })
          break
        case 'search':
          this.$store.dispatch('searchVideoInfo', { pageNo: 1, queryValue: this.queryValue, t: this.time, o: this.order })
          break
        case 'collection':
          this.$store.dispatch('searchVideoInfo', { queryValue: this.$route.params.c, pageNo: 1, t: this.time, o: this.order })
          break
      }
    }
  },
  created() {
    switch (this.$route.name) {
      case 'main':
        this.$store.dispatch('getVideoInfo', { pageNo: this.currentPageNo })
        break
      case 'category':
        this.$store.dispatch('getVideoInfo', { pageNo: this.currentPageNo, c: this.$route.params.c })
        break
      case 'favorites':
        this.$store.dispatch('getFavoriteVideoList', { pageNo: this.currentPageNo })
        break
      case 'search':
        this.$store.dispatch('searchVideoInfo', { pageNo: this.currentPageNo, queryValue: this.queryValue })
        break
      case 'collection':
        this.$store.dispatch('searchVideoInfo', { queryValue: this.$route.params.c, pageNo: this.currentPageNo })
        break
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

  .el-form{
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
