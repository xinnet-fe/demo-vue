import { findSafeGrade } from '@/api/usersafe'

const state = {
  usersafe: {}
}

const mutations = {
  SET_USER_SAFE: (state, res) => {
    state.usersafe = res
  }
}

const actions = {
  findSafeGrade({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      findSafeGrade(payload).then(res => {
        commit('SET_USER_SAFE', res.data)
        resolve(res.data)
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
