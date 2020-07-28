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
<<<<<<< HEAD
// import Highcharts from 'highcharts/highstock'
// import HighchartsDrilldown from 'highcharts/modules/drilldown'

// HighchartsDrilldown(Highcharts)
=======

>>>>>>> master
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
<<<<<<< HEAD
// Vue.prototype.highchart = Highcharts
=======
>>>>>>> master
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
