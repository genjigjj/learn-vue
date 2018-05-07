import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import VueI18n from 'vue-i18n'
import moment from 'moment'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
// Ready translated locale messages
const messages = {
  en: {
    message: {
      videos: 'Videos',
      collections: 'Collections',
      categories: 'Categories',
      favorites: 'Favorites',
      search: 'search',
      timeLine: 'TimeLine',
      time: ['All', 'Added Today', 'Added This Week', 'Added This Month'],
      orderBy: 'OrderBy',
      order: ['Being Watched', 'Most Recent', 'Most View', 'Most Commented', 'Top Rated', 'Top Favorites', 'Longest'],
      more: 'show more',
      collectionSuccess: 'Add to your favorites successfully',
      removeCollection: 'Remove from your favorites successfully',
      noMoreVideos: 'No more relative videos'
    },
    ...enLocale
  },
  'zh-CN': {
    message: {
      videos: '视频',
      collections: '影集',
      categories: '分类',
      favorites: '我的收藏',
      search: '搜索',
      timeLine: '时间线',
      time: ['全部', '今天', '本周', '本月'],
      orderBy: '排序',
      order: ['观看中', '最新', '最多观看', '最多评论', '最高评分', '最多收藏', '最长'],
      more: '更多',
      collectionSuccess: '收藏成功',
      removeCollection: '取消收藏成功',
      noMoreVideos: '暂无相关视频'
    },
    ...zhLocale
  }
}

moment.locale(navigator.language)
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: navigator.language, // set locale
  messages // set locale messages
})
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

export default i18n
