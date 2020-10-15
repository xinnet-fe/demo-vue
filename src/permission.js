import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/demos/get-page-title'
import { hasDevelopment, logoutApi } from '@/settings'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const hasXbToken = getToken('xbtoken') || getToken('xbtoken_id') || getToken('xtoken')
  if (hasXbToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
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
