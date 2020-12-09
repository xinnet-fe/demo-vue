import * as api from '@/api/accountDetail'

const state = {

}

const mutations = {

}

const actions = {
  getTransactionType({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.getTransactionType(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  list({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.list(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  billQuery({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.billQuery(query).then(res => {
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
