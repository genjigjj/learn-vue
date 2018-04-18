<template>
  <div id="categories">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[0]" :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[1]" :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[2]" :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[3]" :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[4]" :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[5]" :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
             <img :src="item.cover_url" />
           </el-card>
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
