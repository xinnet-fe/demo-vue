import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './setElement'
import '@/styles/index.scss' // global css
import '@/styles/console.scss'
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import Echarts from 'echarts'
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'

Vue.use(VueKindEditor)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.echarts = Echarts
Vue.prototype.echartsColorList = [
  '#4f7acb',
  '#ff9019',
  '#5b9bd5',
  '#ffc000',
  '#ff6666',
  '#1bb3f3',
  '#29cb97',
  '#ca65ff'
]

const app = new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    // console.log('main.js -> mounted()')
    // 如果是IE11、10，vue中hash跳转使用a标签跳转将会失败，解决方案如下
    const sUserAgent = navigator.userAgent.toLowerCase()
    const ie11 = sUserAgent.indexOf('trident') > -1 && sUserAgent.indexOf('rv') > -1
    const ie10 = sUserAgent.indexOf('msie 10') > -1
    if (ie11 || ie10) {
      console.log('绑定 hashchange 事件')
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        console.log(this.$route.path, currentPath)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      })
    }
  },
  render: h => h(App)
})

export default app
