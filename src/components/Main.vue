<template>
  <div id="main">
    <el-container>
      <el-header>
        <el-dropdown>
          <span class="el-dropdown-link">
           郭佳俊<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span><img :src="image"/></span>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <router-link to="/main">
                  <el-menu-item index="1-1">主页</el-menu-item>
                </router-link>
                <router-link to="/news">
                  <el-menu-item index="1-2">新闻</el-menu-item>
                </router-link>
                <el-menu-item index="1-3">选项3</el-menu-item>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>导航三</template>
              <el-menu-item-group>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                <el-menu-item index="3-3">选项3</el-menu-item>
                <el-submenu index="3-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'main',
    data(){
      return{
        image:'/src/assets/logo.png'
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  img{
    height:50px;
    width: 50px;
    float: right;
  }

  .el-aside {
    color: #333;
  }
  .el-dropdown{
    float: right;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff9fd;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .router-link-active,a{
    text-decoration: none;
  }
</style>
