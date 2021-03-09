import { getOverviewSize, getCurve, getDetailedCurve, getNewAndOld } from '@/api/chart'

function dataSort(data) {
  data.sort((a, b) => {
    const aTime = new Date(a.occurDate).getTime()
    const bTime = new Date(b.occurDate).getTime()
    return aTime - bTime
  })
  return data
}

const state = {
  overviewSize: {},
  newAndOldUser: []
}

const mutations = {
  GET_OVERVIEW_SIZE: (state, res) => {
    state.overviewSize = res.data
  },
  GET_USER: (state, res) => {
    state.newAndOldUser = dataSort(res.data)
  }
}

const actions = {
  getOverviewSize({ commit }, data) {
    return getOverviewSize(data).then(res => {
      commit('GET_OVERVIEW_SIZE', res)
      return res
    })
  },
  getCurve({ commit }, data) {
    return getCurve(data)
  },
  getDetailedCurve({ commit }, data) {
    return getDetailedCurve(data)
  },
  getNewAndOld({ commit }, data) {
    return getNewAndOld(data).then(res => {
      commit('GET_USER', res)
      return res
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
