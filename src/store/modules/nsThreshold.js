import * as api from '@/api/nsThreshold'

const state = {
}

const mutations = {
}

const actions = {
  queryNsThresholdList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.queryNsThresholdList(payload).then(res => {
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
