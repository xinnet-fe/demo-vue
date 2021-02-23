import * as api from '@/api/performance'

const state = {
}

const mutations = {

}

const actions = {
  queryHyDlSalePerformanceData(context, payload) {
    return api.queryHyDlSalePerformanceData(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryProductTypeList(context, payload) {
    return api.queryProductTypeList(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  querySaleNameList(context, payload) {
    return api.querySaleNameList(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryCompanyList(context, payload) {
    return api.queryCompanyList(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updatePerformance(context, payload) {
    return api.updatePerformance(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  exportCsv(context, payload) {
    return api.exportCsv(payload).then(res => {
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
