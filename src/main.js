import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './setElement'
import '@/styles/index.scss' // global css

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
import { when } from '@/utils/request'

Vue.use(VueKindEditor)
Vue.prototype.when = when

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
  render: h => h(App)
})

export default app
