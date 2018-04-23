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
                 active-text-color="#ffd04b" mode="horizontal" :router="true">
              <el-menu-item index="/" @click.native="handleSelect(1)">Videos</el-menu-item>
              <el-menu-item :index="'/collections'" @click.native="handleSelect(2)">Collections</el-menu-item>
              <el-menu-item :index="'/categories'" @click.native="handleSelect(3)">Categories</el-menu-item>
              <el-menu-item :index="'/favorites'" @click.native="handleSelect(4)">Favorites</el-menu-item>
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
        this.$store.commit('setQueryValue', this.inputValue)
        this.$store.dispatch('searchVideoInfo')
        this.$router.push({ name: 'search' })
      }
    },
    handleSelect(no) {
      if (this.$store.state.videos.lock) {
        switch (no) {
          case 1:
            this.$store.dispatch('getVideoInfo')
            break
          case 2:
            this.$store.dispatch('getCollectionsInfo')
            break
          case 3:
            this.$store.dispatch('getCategoriesInfo')
            break
          case 4:
            this.$store.dispatch('getFavoriteVideoList')
            break
        }
      }
    }
  },
  created() {
    this.$store.commit('setLock', true)
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
    float: left;
  }

  .el-menu--horizontal {
    border-bottom: none;
  }
</style>
