<template>
  <div id="categories">
    <el-main>
      <el-row :gutter="20" v-for="temp in sliceList" :key="temp.id">
        <el-col :lg="6" :xs="24" v-for="item in temp" :key="item.id">
          <router-link :to="{
                 name : 'category',
                 params : {
                 c : item.CHID
                 }}">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
             <el-row>
               <el-col :span="16">
                 <div class="pull-left">
                   {{item.name}}
                 </div>
               </el-col>
               <el-col :span="8">
                 <div class="pull-right">
                   <span class="badge">{{item.total_videos}}</span>
                 </div>
               </el-col>
             </el-row>
           </el-card>
          </router-link>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'categories',
  computed: {
    ...mapGetters({
      sliceList: 'categoriesGetter'
    })
  },
  created() {
    this.$store.commit('setLock', true)
    this.$store.dispatch('getCategoriesInfo')
  }
}
</script>

<style scoped>
  .el-main .el-row {
    margin-bottom: 10px;
  }

  .el-col {
    border-radius: 4px;
    margin-bottom: 10px;
  }

  img{
    width: 100%;
  }

  .el-card .el-row{
    border: 0;
    background-color: rgba(0,0,0,.7);
    color: #fff;
    padding: 3px 5px;
    font-size: 16px;
    margin-bottom: 0px;
    margin-top: -10%;
  }

  .pull-left{
    float: left;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pull-right{
    float: right;
    text-align: right;
  }

  .badge{
    color: #fff;
    background-color: #2a9fd6;
    min-width: 16px;
    padding: 0 6px;
    line-height: 19px;
    font-size: 12px;
    display: inline-block;
    font-weight: 700;
    border-radius: 10px;
    text-align: center;
  }
</style>
