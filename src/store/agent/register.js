import Vue from 'vue'
import Vuex from 'vuex'
import area from './web/area.js'
import smsCaptcha from './web/smsCaptcha.js'
import users from './web/users.js'

export default () => {
  return new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    },
    modules: {
      area,
      smsCaptcha,
      users
    }
  })
}