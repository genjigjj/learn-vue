<template>
  <div id="sign">
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
        <el-input type="text" v-model="repassword" placeholder="请再次输入密码">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button round type="primary" @click="sign">注册</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-link to="/login"><span>登录</span></router-link>
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
        password: '',
        repassword:''
      }
    },
    methods:{
      sign(){
        if(this.userName==''||this.password==''||this.repassword==''){
          this.$message({
            message: '请填写完整信息哦！',
            type: 'warning',
            center: true
          });
          return;
        }
        if(this.password!=this.repassword){
          this.$message({
            message: '两次填写的密码不一致哦！',
            type: 'warning',
            center: true
          });
          return;
        }
      }
    }
  }
</script>

<style scoped>
  #sign{
    width: 200px;
    height: auto;
    margin: 10% auto;
  }
  .el-row{
    margin-top: 10px;
  }
  .el-button{
    width: 200px;
  }
  span{
    float: right;
    color:red;
    cursor: pointer;
  }
</style>
