/*
 * @Author: your name
 * @Date: 2020-06-04 17:39:19
 * @LastEditTime: 2020-06-04 22:59:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\store\agent\repassword.js
 */ 
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