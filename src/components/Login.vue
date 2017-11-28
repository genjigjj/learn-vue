<template>
  <div id="login">
    <el-row>
      <el-col>
        <el-input type="text" v-model="userName" placeholder="请输入用户名">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input type="text" v-model="password" placeholder="请输入密码">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button round type="primary" @click="login">登录</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-link to="/sign"><span>注册</span></router-link>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  export default {
    name: 'login',
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      //登录
      login() {
        if (this.userName == '' || this.password == '') {
          this.$message({
            message: '请填写完整信息哦！',
            type: 'warning',
            center: true
          });
        }
        else {
          this.$router.push('/main');
        }
      }
    },
  }
</script>

<style scoped>
  #login {
    width: 200px;
    height: auto;
    margin: 10% auto;
  }

  .el-row {
    margin-top: 10px;
  }

  .el-button {
    width: 200px;
  }

  span {
    float: right;
    color: red;
    cursor: pointer;
  }
</style>
