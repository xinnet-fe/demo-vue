import {
  queryRefundList,
  refundOrder,
  querySpecRefundList,
  refundSpecOrder
} from '@/api/refund'

const state = {
  // 常规
  queryRefundList: {},
  refundOrder: {},
  // 特殊
  querySpecRefundList: {},
  refundSpecOrder: {}
}

const mutations = {
  // 常规
  QUERYREFUNDLIST: (state, res) => {
    state.queryRefundList = res
  },
  REFUNDORDER: (state, res) => {
    state.refundOrder = res
  },
  // 特殊
  QUERYSPECREFUNDLIST: (state, res) => {
    state.querySpecRefundList = res
  },
  REFUNDSPECORDER: (state, res) => {
    state.refundSpecOrder = res
  }
}

const actions = {
  // 常规
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
  },
  // 特殊
  querySpecRefundList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      querySpecRefundList(payload).then(res => {
        if (res.code === null || res.code === undefined || res.code === '') {
          commit('QUERYSPECREFUNDLIST', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  refundSpecOrder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      refundSpecOrder(payload).then(res => {
        if (res.code === null || res.code === undefined || res.code === '') {
          commit('REFUNDSPECORDER', res)
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
