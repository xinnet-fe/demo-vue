import { applyList } from '@/api/agentManage'

const state = {
  applyList: [],
  applyPage: {
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
  }
}

const actions = {
  getApplyList({ commit }, query) {
    return applyList(query).then(res => commit('GET_APPLY_LIST', res))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
