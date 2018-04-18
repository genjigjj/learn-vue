<template>
  <div id="collections">
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
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="12"
        :page-count="getPageCount"
        :currentPage.sync="currentPage"
        @current-change="changePage">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'collections',
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      totalCollections: state => state.collections.totalCollections
    }),
    ...mapGetters({
      sliceList: 'collectionsGetter'
    }),
    getPageCount() {
      return Math.ceil(this.totalCollections / 12)
    }
  },
  methods: {
    // 换页
    changePage(pageNo) {
      this.$store.dispatch('getCollectionsInfo', { pageNo: pageNo })
    }
  },
  created() {
    this.$store.dispatch('getCollectionsInfo', { pageNo: this.currentPage })
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

  img{
    width: 100%;
  }
</style>
