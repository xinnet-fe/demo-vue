import {
  queryRefundList,
  refundOrder
} from '@/api/refund'

const state = {
  queryRefundList: {},
  refundOrder: {}
}

const mutations = {
  QUERYREFUNDLIST: (state, res) => {
    state.queryRefundList = res
  },
  REFUNDORDER: (state, res) => {
    state.refundOrder = res
  }
}

const actions = {
  queryRefundList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      queryRefundList(payload).then(res => {
        if (res.code === null || res.code === undefined || res.code === '') {
          commit('QUERYREFUNDLIST', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  refundOrder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      refundOrder(payload).then(res => {
        if (res.code === null || res.code === undefined || res.code === '') {
          commit('REFUNDORDER', res)
        }
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
