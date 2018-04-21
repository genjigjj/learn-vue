<template>
  <div id="app">
    <el-container>
      <el-header height="'65px'">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="logo">
              <img alt="logo" src="/static/logo.webp">
            </div>
          </el-col>
          <el-col :span="10">
            <el-menu :default-active="$route.path" class="header-menu" background-color="#323232" text-color="#ababab"
               @select="handleSelect" active-text-color="#ffd04b" mode="horizontal" :router="true">
              <el-menu-item :index="'/favorites'">Favorites</el-menu-item>
              <el-menu-item :index="'/categories'">Categories</el-menu-item>
              <el-menu-item :index="'/collections'">Collections</el-menu-item>
              <el-menu-item index="/">Videos</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <div class="search-input">
              <el-input v-model="inputValue" @keyup.native.enter="searchVideo" placeholder="请输入搜索内容" class="input-with-search">
                <el-button @click.native="searchVideo" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-header>
        <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    searchVideo() {
      if (this.inputValue !== '') {
        this.$store.dispatch('searchVideoInfo', {
          queryValue: this.inputValue,
          pageNo: 1,
          t: this.$store.state.videos.queryParams.t,
          o: this.$store.state.videos.queryParams.o })
        this.$store.commit('SET_QUERYVALUE', this.inputValue)
        this.$router.push({ name: 'search' })
      }
    },
    handleSelect(key) {
      switch (key) {
        case '/':
          this.$store.dispatch('getVideoInfo', {
            pageNo: 1,
            t: this.$store.state.videos.queryParams.t,
            o: this.$store.state.videos.queryParams.o
          })
          break
        case '/favorites':
          this.$store.dispatch('getFavoriteVideoList', { pageNo: 1 })
          break
        case '/category':
          this.$store.dispatch('getVideoInfo', { pageNo: 1, c: this.$route.params.c })
          break
      }
    }
  }
}
</script>

<style scoped>

  .input-with-search {
    background-color: #fff;
  }

  .search-input {
    padding: 10px;
  }

  .el-header {
    border: 1px solid #eee;
    background-color: #323232;
  }

  .el-menu-item {
    float: right;
  }

  .el-menu--horizontal {
    border-bottom: none;
  }
</style>
