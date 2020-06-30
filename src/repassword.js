import Vue from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './setElement'
import '@/styles/index.scss' // global css

import App from './views/pages/repassword'
// import createRouter from './router/repassword'
// import createStore from './store/agent/repassword'

import './icons' // icon
import * as filters from './filters' // global filters
require('classlist-polyfill')

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
