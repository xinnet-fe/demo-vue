import * as api from '@/api/agent/area'

const state = {
}

const mutations = {
}

const actions = {
  // 代理用户注册页面查询所有省
  getCoreProvice({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getCoreProvice(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 短信发送接口
  registDl({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.registDl(payload).then(response => {
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
