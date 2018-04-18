<template>
  <div id="collections">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in collections.slice(0,4)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in collections.slice(4,8)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in collections.slice(8,12)" :key="item.id">
           <el-card>
             <img :src="item.cover_url" />
           </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="12"
        :page-count="getPageCount"
        @current-change="changePage">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'collections',
  computed: {
    getPageCount() {
      return Math.ceil(this.totalVideos / 12)
    },
    ...mapState(
      ['collections'])
  },
  methods: {
    // 换页
    changePage(pageNo) {
      this.$store.dispatch('getCollectionsInfo', { pageNo: pageNo })
    }
  },
  created() {
    this.$store.dispatch('getCollectionsInfo', { pageNo: 0 })
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

  .el-pagination {
    text-align: center;
  }
</style>
