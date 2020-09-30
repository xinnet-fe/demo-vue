import * as api from '@/api/tradeOrder'

const state = {

}

const mutations = {

}

const actions = {
  orderList({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.orderList(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  orderDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.orderDetail(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeOrderPrice({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.changeOrderPrice(payload).then(res => {
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
