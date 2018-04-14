<template>
  <div id="video">
    <el-container>
      <el-main>
        <el-card>
          <iframe :src="decodeUrl"
                  allowfullscreen frameborder="0" scrolling="no">
          </iframe>
        </el-card>
        <el-button type="primary" icon="el-icon-back" circle @click="goback"></el-button>
        <el-button :type="type" icon="el-icon-star-off" circle @click="collection"></el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import CryptoJS from "crypto-js"

  export default {
    name: "video",
    data() {
      return {
        videoUrl: this.$route.query.q,
        vid: this.$route.query.v,
        type: 'info'
      }
    },
    methods: {
      collection() {
        this.type === 'info' ? this.type = 'danger' : this.type = 'info';
      },
      goback(){
        this.$router.back();
      }
    },
    computed: {
      decodeUrl() {
        let parsedWordArray = CryptoJS.enc.Base64.parse(this.videoUrl);
        return parsedWordArray.toString(CryptoJS.enc.Utf8);
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
