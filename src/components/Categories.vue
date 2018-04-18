<template>
  <div id="categories">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in categories.slice(0,6)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in categories.slice(6,12)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in categories.slice(12,18)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in categories.slice(18,24)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'categories',
  computed: {
    ...mapState(
      ['categories'])
  },
  created() {
    this.$store.dispatch('getCategoriesInfo')
  }
}
</script>

<style scoped>
  .el-main .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }
</style>
