import * as api from '@/api/agent/announce'

const state = {
  usersafe: {}
}

const mutations = {
  SET_USER_SAFE: (state, res) => {
    state.usersafe = res
  }
}

const actions = {
  queryDlActivityOrAnnounce({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryDlActivityOrAnnounce(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryContentById({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryContentById(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findDlActivityAnnounce({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.findDlActivityAnnounce(payload).then(res => {
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
