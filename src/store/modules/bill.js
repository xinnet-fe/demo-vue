import * as api from '@/api/bill'

const state = {

}

const mutations = {

}

const actions = {
  billList({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.billList(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ExportExcel({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.ExportExcel(query).then(res => {
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
