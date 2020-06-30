/*
 * @Author: your name
 * @Date: 2020-06-29 22:50:22
 * @LastEditTime: 2020-06-30 13:16:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\register.js
 */ 
// import 'es6-shim'
import Vue from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './setElement'
import '@/styles/index.scss' // global css

import App from './views/pages/register'
// import createRouter from './router/register'
// import createStore from './store/agent/register'

import './icons' // icon
import * as filters from './filters' // global filters
require('classlist-polyfill')
// require('es6-promise').polyfill()
// Vue.use(Vuex)
// const store = createStore()
// const router = createRouter()
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
  // router,
  // store,
  render: h => h(App)
})

export default app
