<template>
  <div id="collections">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[0]" :key="item.id">
          <router-link :to="{
                 name : 'collection',
                 params : {
                 c : item.keyword
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover_url" />
              <el-row>
                <el-col :span="16">
                  <div class="pull-left">
                    {{item.title}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="pull-right">
                    <span class="badge">{{item.video_count}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[1]" :key="item.id">
          <router-link :to="{
                 name : 'collection',
                 params : {
                 c : item.keyword
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover_url" />
              <el-row>
                <el-col :span="16">
                  <div class="pull-left">
                    {{item.title}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="pull-right">
                    <span class="badge">{{item.video_count}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in sliceList[2]" :key="item.id">
          <router-link :to="{
                 name : 'collection',
                 params : {
                 c : item.keyword
                 }}">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover_url" />
              <el-row>
                <el-col :span="16">
                  <div class="pull-left">
                    {{item.title}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="pull-right">
                    <span class="badge">{{item.video_count}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </router-link>
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
