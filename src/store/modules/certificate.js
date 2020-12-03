import * as api from '@/api/certificate'

const state = {
}

const mutations = {
}

const actions = {
  queryCertificateList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.queryCertificateList(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  querySslList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.querySslList(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
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
