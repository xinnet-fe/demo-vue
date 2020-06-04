/*
 * @Author: your name
 * @Date: 2020-06-01 14:05:17
 * @LastEditTime: 2020-06-03 16:50:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\register.js
 */ 
import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './setElement'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router/register'
import store from './store'

import './icons' // icon
import * as filters from './filters' // global filters

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
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
