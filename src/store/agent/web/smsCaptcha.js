import * as api from '@/api/agent/smsCaptcha'

const state = {
}

const mutations = {
}

const actions = {
  // 短信发送接口
  sendCaptchaWithMobile({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.sendCaptchaWithMobile(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
