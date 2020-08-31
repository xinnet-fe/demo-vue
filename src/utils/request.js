import Vue from 'vue'
import delay from 'lodash/delay'
import app from '@/main'
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { duration as _duration, hasDevelopment, logoutApi } from '@/settings'

const errorCode = {
  920000: '服务器发生错误',
  925000: '参数不能为空',
  925020: '所调用的业务应用服务不在线',
  925030: '已经存在',
  925040: '不存在',
  925050: '参数异常，比如时间格式不正确',
  925060: '违反约束，比如删除记录的时候，外键违反约束',
  925070: '存在子内容，比如删除主表记录的时候，还有子表的内容存在',
  925080: '存在多个值',
  925090: '不允许的操作'
}

const demoErrorCode = [60204, 50008]

const vm = new Vue()

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status = parseInt(res.status, 10)
    // mock必返回code，请求接口错误才返回code
    const code = res.code
    // console.log(`status: ${status}`)
    // console.log(`code: ${code}`)
    // status：996登录超时
    if (status === 996) {
      const message = '登录超时'
      logoutToLogin(message)
      return Promise.reject(new Error(message))
    }

    // 925010 访问拒绝
    if (code && code === 925010) {
      app.$router.push(`/401`)
      initLoading()
      return errorResult('访问拒绝')
    } else if (code && code in errorCode) {
      initLoading()
      return errorResult(res.msg || errorCode[code])
    } else if (code && code > 920001 && code < 924999) {
      initLoading()
      return errorResult('应用服务定义的自定义异常')
    } else if (code && code > 925000 && code < 929999) {
      initLoading()
      return errorResult('公共异常')
    }

    // demos
    if (hasDevelopment && !isNull(code) && code !== 20000 && demoErrorCode.indexOf(code) > -1) {
      errorMessage(res.message)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        vm.$msgBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      initLoading()
      return Promise.reject(new Error(res.message))
    }

    return res
  },
  error => {
    const { status } = error.response
    let message = ''
    // console.log(error.response)
    // console.error(`error status: ${status}`)
    // '3XX-4XX': '服务器响应错误'
    if (status >= 300 && status <= 499) {
      message = '服务器响应错误'
    // '5XX': '系统维护中'
    } else if (status >= 500 && status < 600) {
      message = '系统维护中'
      app.$router.push(`/5XX`)
      // 需要跳转到维护页面
    } else {
      message = error
    }
    initLoading()
    return errorResult(message)
  }
)

export function initLoading() {
  delay(() => store.commit('loading/INIT_LOADING'), 300)
}

function isNull(v) {
  return v === undefined || v === '' || v === null
}

// 注销登录到登录页
function logoutToLogin(message) {
  store.dispatch('user/resetToken')
  errorMessage(message)

  const { $router, $route } = app
  if (hasDevelopment) {
    $router.push(`/login?redirect=${$route.fullPath}`)
  } else {
    global.location = logoutApi
  }
}

// 显示错误提示，return reject
function errorResult(message) {
  errorMessage(message)
  return Promise.reject(new Error(message))
}

// 显示错误提示
function errorMessage(message, duration = _duration) {
  vm.$message.error({
    message,
    duration
  })
}

/**
 * @param  {[function]} funs
 */
function when(...funs) {
  return Promise.all(funs)
}

export {
  when,
  errorMessage,
  logoutToLogin,
  isNull
}

export default service
