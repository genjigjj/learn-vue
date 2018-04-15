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
              <el-menu-item :index="'/favorites'">Favorites</el-menu-item>
              <el-menu-item index="3">Categories</el-menu-item>
              <el-menu-item index="2">Collections</el-menu-item>
              <el-menu-item index="/">Videos</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <div class="search-input">
              <el-input placeholder="请输入内容" class="input-with-search">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <keep-alive include="index">
        <router-view></router-view>
      </keep-alive>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: 'app'
  }
</script>

<style scoped>

  .input-with-search {
    background-color: #fff;
  }

  .search-input{
    padding: 10px;
  }

  .el-header{
    border: 1px solid #eee;
    background-color: #323232;
  }
  .el-menu-item{
    float: right;
  }

  .el-menu--horizontal{
    border-bottom:none;
  }
</style>
