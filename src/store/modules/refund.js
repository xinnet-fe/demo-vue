import {
  refundProduct_List,
  refundProduct_BillList,
  instance_Refund_Money,
  instance_Refund
} from '@/api/refund'

const state = {
  refundProduct_List: {
    data: [],
    page: {}
  },
  refundProduct_BillList: {
    data: []
  },
  instance_Refund_Money: {},
  instance_Refund: {}
}

const mutations = {
  // 1、产品列表查询
  REFUNDPRODUCTLIST: (state, res) => {
    state.refundProduct_List = res
  },
  // 2、产品下账单列表查询
  REFUNDPRODUCTBILLLIST: (state, res) => {
    state.refundProduct_BillList = res
  },
  // 3、获取退费建议价格
  INSTANCEREFUNDMONEY: (state, res) => {
    state.instance_Refund_Money = res
  },
  // 4、进行退费
  INSTANCEREFUND: (state, res) => {
    state.instance_Refund = res
  }
}

const actions = {
  // 1、产品列表查询
  refundProduct_List({ commit }, payload) {
    // return refundProduct_List(payload).then(res => commit('REFUNDPRODUCTLIST', res))
    return new Promise((resolve, reject) => {
      refundProduct_List(payload).then(res => {
        if (res.success) {
          commit('REFUNDPRODUCTLIST', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 2、产品下账单列表查询
  refundProduct_BillList({ commit }, payload) {
    // console.log('2、产品下账单列表查询')
    // return refundProduct_BillList(payload).then(res => commit('REFUNDPRODUCTBILLLIST', res))
    return new Promise((resolve, reject) => {
      refundProduct_BillList(payload).then(res => {
        if (res.success) {
          commit('REFUNDPRODUCTBILLLIST', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 3、获取退费建议价格
  instance_Refund_Money({ commit }, payload) {
    // return instance_Refund_Money(payload).then(res => commit('INSTANCEREFUNDMONEY', res))
    return new Promise((resolve, reject) => {
      instance_Refund_Money(payload).then(res => {
        if (res.success) {
          commit('INSTANCEREFUNDMONEY', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 4、进行退费
  instance_Refund({ commit }, payload) {
    // console.log('4、进行退费')
    // return instance_Refund(payload).then(res => commit('INSTANCEREFUND', res))
    return new Promise((resolve, reject) => {
      instance_Refund(payload).then(res => {
        if (res.success) {
          commit('INSTANCEREFUND', res)
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
