/*
 * @Author: your name
 * @Date: 2020-06-01 14:40:18
 * @LastEditTime: 2020-06-05 07:45:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\router\register.js
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import { hasDevelopment } from '@/settings'

Vue.use(Router)

const constantRoutes = [
  {
    path: '',
    component: () => import('@/views/pages/register'),
    hidden: false
  }
]

export default () => {
  return new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    base: '/register.html'
  })
}