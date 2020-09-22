import * as api from '@/api/realnamequery'

const state = {

}

const mutations = {

}

const actions = {
  upload({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.upload(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  comparePortrait({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.comparePortrait(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  compareEnterpriseInfo({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.compareEnterpriseInfo(payload).then(res => {
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
