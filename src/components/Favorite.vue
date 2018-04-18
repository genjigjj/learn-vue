<template>
  <div id="index">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[0]" :key="item.id">
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
        <el-col :span="6" v-for="item in sliceList[1]" :key="item.id">
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
        <el-col :span="6" v-for="item in sliceList[2]" :key="item.id">
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
        :currentPage.sync="currentPage"
        @current-change="changePage">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'favorite',
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      totalVideos: state => state.videos.totalVideos
    }),
    ...mapGetters({
      sliceList: 'videosGetter'
    }),
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
    // 换页
    changePage(pageNo) {
      this.$store.dispatch('getFavoriteVideoList', { pageNo: pageNo })
    },
    encodeUrl(url) {
      const wordArray = CryptoJS.enc.Utf8.parse(url)
      return CryptoJS.enc.Base64.stringify(wordArray)
    }
  },
  activated() {
    this.$store.dispatch('getFavoriteVideoList', { pageNo: this.currentPage })
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
