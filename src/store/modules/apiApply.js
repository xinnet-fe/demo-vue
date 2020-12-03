import * as api from '@/api/apiApply'

const state = {
}

const mutations = {
}

const actions = {
  getApiApplyList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getApiApplyList(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  modifyState({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.modifyState(payload).then(res => {
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
