<template>
  <div id="app">
    <el-container>
      <el-header height="'65px'">
        <el-row :gutter="20">
          <el-col :lg="3" :xs="12">
            <div class="logo">
              <router-link :to="{name: 'main'}">
                <img alt="logo" src="/static/logo.webp">
              </router-link>
            </div>
          </el-col>
          <el-col :lg="5" :xs="12" class="language">
            <el-row>
                <el-select size="small" v-model="language" placeholder="请选择" @change="selectLang">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-row>
          </el-col>
          <el-col :lg="10" :xs="24">
            <el-menu :default-active="$route.path" class="header-menu" background-color="#323232" text-color="#ababab"
                     active-text-color="#ffd04b" mode="horizontal" :router="true">
              <el-menu-item index="/" @click.native="handleSelect(1)">{{ $t("message.videos") }}</el-menu-item>
              <el-menu-item :index="'/collections'" @click.native="handleSelect(2)">{{ $t("message.collections") }}</el-menu-item>
              <el-menu-item :index="'/categories'" @click.native="handleSelect(3)">{{ $t("message.categories") }}</el-menu-item>
              <el-menu-item :index="'/favorites'" @click.native="handleSelect(4)">{{ $t("message.favorites") }}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :lg="6" :xs="24">
            <div class="search-input">
              <el-input v-model="inputValue" @keyup.native.enter="searchVideo" :placeholder="$t('message.search')"
                        class="input-with-search">
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
import moment from 'moment'

export default {
  name: 'app',
  data() {
    return {
      inputValue: '',
      options: [{
        value: 'zh-CN',
        label: '中文'
      }, {
        value: 'en',
        label: 'English'
      }],
      language: ''
    }
  },
  methods: {
    searchVideo() {
      if (this.inputValue !== '') {
        this.$store.commit('setPageNo', 1)
        this.$store.commit('setQueryValue', this.inputValue)
        this.$store.dispatch('searchVideoInfo')
        this.$router.push({ name: 'search' })
      }
    },
    handleSelect(no) {
      if (this.$store.state.videos.lock) {
        switch (no) {
          case 1:
            this.$store.commit('setPageNo', 1)
            this.$store.commit('setCategory', '')
            this.$store.dispatch('getVideoInfo')
            break
          case 2:
            this.$store.commit('setCollectionPageNo', 1)
            this.$store.dispatch('getCollectionsInfo')
            break
          case 3:
            this.$store.dispatch('getCategoriesInfo')
            break
          case 4:
            this.$store.commit('setPageNo', 1)
            this.$store.dispatch('getFavoriteVideoList')
            break
        }
      }
    },
    // 切换语言
    selectLang() {
      this.$i18n.locale = this.language
      moment.locale(this.language)
      this.$store.commit('setLang', this.language)
    }
  },
  created() {
    this.language = navigator.language
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

  .el-menu--horizontal {
    border-bottom: none;
  }

  .language{
    margin-top: 10px;
    padding: 10px 13% 10px 10px!important;
  }
</style>
