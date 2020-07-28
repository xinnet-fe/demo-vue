import { getOverviewSize, getCurve, getDetailedCurve } from '@/api/chart'

const state = {
  overviewSize: {},
  curve: [],
  detailedCurve: []
}

const mutations = {
  GET_OVERVIEW_SIZE: (state, res) => {
    state.overviewSize = res.data
  },
  GET_CURVE: (state, res) => {
    state.curve = res.data
  },
  GET_DETAILED_CURVE: (state, res) => {
    state.detailedCurve = res.data
  }
}

const actions = {
  getOverviewSize({ commit }, data) {
    return getOverviewSize(data).then(res => commit('GET_OVERVIEW_SIZE', res))
  },
  getCurve({ commit }, data) {
    return getCurve(data).then(res => commit('GET_CURVE', res))
  },
  getDetailedCurve({ commit }, data) {
    return getDetailedCurve(data).then(res => commit('GET_DETAILED_CURVE', res))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
