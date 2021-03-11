import * as api from '@/api/security'

const state = {
}

const mutations = {

}

const actions = {
  getProductsByCustId(context, payload) {
    return api.getProductsByCustId(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getServiceInfos(context, payload) {
    return api.getServiceInfos(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getVisitLogs(context, payload) {
    return api.getVisitLogs(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findBossOrder(context, payload) {
    return api.findBossOrder(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findOrderInfoByCustId(context, payload) {
    return api.findOrderInfoByCustId(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getCustomerDetailAndProtectById(context, payload) {
    return api.getCustomerDetailAndProtectById(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },

  findSmaEmpPosition(context, payload) {
    return api.findSmaEmpPosition(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getAreaByRole(context, payload) {
    return api.getAreaByRole(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getSubByRole(context, payload) {
    return api.getSubByRole(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getDeptByRole(context, payload) {
    return api.getDeptByRole(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  getAllSalersByDeptId(context, payload) {
    return api.getAllSalersByDeptId(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
