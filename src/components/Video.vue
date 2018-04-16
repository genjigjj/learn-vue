<template>
  <div id="video">
      <el-main>
        <el-card>
          <iframe :src="decodeUrl"
                  allowfullscreen frameborder="0" scrolling="no">
          </iframe>
        </el-card>
        <el-button type="primary" icon="el-icon-back" circle @click="goBack"></el-button>
        <el-button :type="type" icon="el-icon-star-off" circle @click="collection"></el-button>
      </el-main>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import Store from 'store'

export default {
  name: 'video',
  data() {
    return {
      videoUrl: this.$route.query.q,
      vid: this.$route.query.v,
      type: ''
    }
  },
  methods: {
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
          message: '收藏成功',
          type: 'success'
        })
      } else {
        const index = videoList.indexOf(this.vid)
        videoList.splice(index, 1)
        Store.set('videoList', videoList)
        this.type = 'info'
        this.$message({
          message: '取消收藏成功',
          type: 'success'
        })
      }
    },
    goBack() {
      this.$router.back()
    }
  },
  computed: {
    decodeUrl() {
      const parsedWordArray = CryptoJS.enc.Base64.parse(this.videoUrl)
      return parsedWordArray.toString(CryptoJS.enc.Utf8)
    }
  },
  mounted() {
    const videoList = Store.get('videoList')
    if (videoList === undefined || videoList.indexOf(this.vid) === -1) {
      this.type = 'info'
    } else {
      this.type = 'danger'
    }
  }
}
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 480px;
    overflow: hidden;
  }

  .el-button {
    float: right;
    margin: 10px;
  }
</style>
