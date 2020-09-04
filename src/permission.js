import Vue from 'vue'
import router from '@/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/demos/get-page-title'
import { when } from './utils/request'
import { hasDevelopment, logoutApi } from '@/settings'

const vm = new Vue()

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// let loginin = 'true'
let loginin = 'notuse'
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasXbToken = getToken('xbtoken') || getToken('xbtoken_id')
  console.log(hasXbToken)
  if (hasXbToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      let hasMenus = 0
      let hasUser = 0
      if (loginin === 'notuse') {
        hasMenus = store.getters.menus && store.getters.menus.length > 0
        hasUser = store.getters.user && store.getters.user.agentCode
      }
      // alert(JSON.stringify(store.getters.user))
      // console.log(store.getters.user)
      if (loginin === true || (hasMenus && hasUser)) {
        next()
      } else {
        try {
          let accessRoutes
          if (loginin === false) {
            loginin = true
            accessRoutes = await store.dispatch('permission/generateRoutes')
          } else {
            const [menus] = await when(
              store.dispatch('userinfo/getSidebarMenus'),
              store.dispatch('userinfo/getUser'),
              store.dispatch('userinfo/getAgentAccount'),
              store.dispatch('userinfo/findGradeByAgent'),
              store.dispatch('usersafe/findSafeGrade')
            )
            accessRoutes = await store.dispatch('permission/generateMainRoutes', menus)
          }

          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          if (loginin !== 'notuse') {
            loginin = false
          }
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          vm.$message.error(error || 'Has Error')
          console.error(error)
          // if (hasDevelopment) {
          //   next(`/login?redirect=${to.path}`)
          // } else {
          //   global.location = logoutApi
          // }
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (loginin !== 'notuse') {
      loginin = false
    }
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      if (hasDevelopment) {
        next(`/login?redirect=${to.path}`)
      } else {
        global.location = logoutApi
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

router.onError(error => {
  const cannotFindModule = 'Cannot find module'
  const { message } = error

  if (message && message.indexOf(cannotFindModule) > -1) {
    router.replace('/404')
    NProgress.done()
  }
})
