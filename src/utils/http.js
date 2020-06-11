import Vue from 'vue'
import axios from 'axios'
import { duration as _duration, hasDevelopment } from '@/settings'

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

const vm = new Vue()

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // config.headers['Referer'] = 'https://console.xinnet.com'
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
  response => {
    const res = response.data
    const status = parseInt(res.status, 10)
    // mock必返回code，请求接口错误才返回code
    const code = isUndefined(res.code) ? parseInt(res.code, 10) : res.code

    // status：996登录超时
    if (status === 996) {
      const message = '登录超时'
      console.error('996')
      return Promise.reject(new Error(message))
    }
    if (!code) {
      return res
    }
    // 925010 访问拒绝
    if (code && code === 925010) {
      console.error('error 925010')
      return errorResult('访问拒绝')
    } else if (code && code in errorCode) {
      return errorResult(res.msg || errorCode[code])
    } else if (code && code > 920001 && code < 924999) {
      return errorResult('应用服务定义的自定义异常')
    } else if (code && code > 925000 && code < 929999) {
      return errorResult('公共异常')
    } else {
      return res
    }

    // // demos
    // if (hasDevelopment && isUndefined(code) && code !== 20000) {
    //   errorMessage(res.message)
    //   return Promise.reject(new Error(res.message))
    // }

    // return res
  },
  error => {
    const { status } = error.response
    let message = ''
    // '3XX-4XX': '服务器响应错误'
    if (status >= 300 && status <= 499) {
      message = '服务器响应错误'
    // '5XX': '系统维护中'
    } else if (status >= 500 && status < 600) {
      message = '系统维护中'
      console.error('error /5XX')
      // 需要跳转到维护页面
    } else {
      message = error
    }
    return errorResult(message)
  }
)

function isUndefined(code) {
  return code !== undefined
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
  isUndefined
}

export default service
