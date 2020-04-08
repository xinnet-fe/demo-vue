import Vue from 'vue'
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/demos/auth'

const errorCodeMessage = {
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。'
}

const vm = new Vue()

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
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

    // if the custom code is not 20000, it is judged as an error.
    if (res.code in errorCodeMessage) {
      const message = errorCodeMessage[res.code]
      vm.$message.error({
        message,
        duration: 5 * 1000
      })
      return Promise.reject(new Error(message))
    } else if (res.code !== 20000 && res.code !== 200) {
      vm.$message.error({
        message: res.message || 'Error',
        duration: 5 * 1000
      })

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
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    vm.$message.error({
      message: error.message,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * @param  {[function]} funs
 */
function when(...funs) {
  return Promise.all(funs)
}

export {
  when
}

export default service
