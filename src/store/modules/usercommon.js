import * as api from '@/api/usercommon'

const state = {
}

const mutations = {
}

const actions = {
  queryMyServices({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryMyServices(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryMsgWorkorder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryMsgWorkorder(payload).then(res => {
        resolve(res)
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
