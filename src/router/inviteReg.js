/*
 * @Author: your name
 * @Date: 2020-06-01 14:40:18
 * @LastEditTime: 2020-06-03 11:40:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\router\register.js
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import { hasDevelopment } from '@/settings'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '',
    component: () => import('@/views/pages/inviteReg'),
    hidden: false
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  base: '/inviteReg.html'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
