import * as api from '@/api/userManager'

const state = {
  allGrade: [],
  queryFinanclAttrList: [],
  queryOrganSaleList: []
}

const mutations = {
  SET_ALL_GRADE: (state, res) => {
    state.allGrade = res.data
  },
  SET_FINANCL_ATTR_LIST: (state, res) => {
    state.queryFinanclAttrList = res.data
  },
  SET_ORGAN_SALE_LIST: (state, res) => {
    state.queryOrganSaleList = res.data
  }
}

const actions = {
  findDlApply({ commit }, query) {
    return api.findDlApply(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findDlInfo({ commit }, query) {
    return api.findDlInfo(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryDlRealInfo({ commit }, query) {
    return api.queryDlRealInfo(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  breakInfomation({ commit }, query) {
    return api.breakInfomation(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateDlInfomation({ commit }, query) {
    return api.updateDlInfomation(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findAllGrade({ commit }, query) {
    return api.findAllGrade(query).then(res => {
      commit('SET_ALL_GRADE', res)
      return res
    }).catch(error => {
      return error
    })
  },
  batchUpdate({ commit }, query) {
    return api.batchUpdate(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryFinanclAttrList({ commit }, query) {
    return api.queryFinanclAttrList(query).then(res => {
      commit('SET_FINANCL_ATTR_LIST', res)
      return res
    }).catch(error => {
      return error
    })
  },
  queryOrganSaleList({ commit }, query) {
    return api.queryOrganSaleList(query).then(res => {
      commit('SET_ORGAN_SALE_LIST', res)
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
