import {
  applyList,
  infoList,
  levelList,
  clientList
} from '@/api/agentManage'

const state = {
  applyList: [],
  applyPage: {
    total: 0,
    page: 1,
    limit: 10
  },
  infoList: [],
  infoPage: {
    total: 0,
    page: 1,
    limit: 10
  }
}

const mutations = {
  GET_APPLY_LIST: (state, res) => {
    const { data, page } = res
    state.applyList = data
    state.applyPage = page
  },
  GET_INFO_LIST: (state, res) => {
    const { data, page } = res
    state.infoList = data
    state.infoPage = page
  }
}

const actions = {
  getApplyList({ commit }, query) {
    return applyList(query).then(res => commit('GET_APPLY_LIST', res))
  },
  getInfoList({ commit }, query) {
    return infoList(query).then(res => commit('GET_INFO_LIST', res))
  },
  getLevelList({ commit }, query) {
    return levelList(query)
  },
  getClientList({ commit }, query) {
    return clientList(query)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}