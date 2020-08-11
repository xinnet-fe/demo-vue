import { detail, addArticle, modifyArticle } from '@/api/article'

const state = {}

const mutations = {}

const actions = {
  detail({ commit }, query) {
    return detail(query)
  },
  addArticle(_, data) {
    return addArticle(data)
  },
  modifyArticle(_, data) {
    return modifyArticle(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
