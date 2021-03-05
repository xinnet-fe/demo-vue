import * as api from '@/api/agent'

const state = {

}

const mutations = {

}

const actions = {
  getCoreProvice({ commit }, query) {
    return api.getCoreProvice(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  selectRegionHierarchical({ commit }, query) {
    return api.selectRegionHierarchical(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateAgentRegion({ commit }, query) {
    return api.updateAgentRegion(query).then(res => {
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
