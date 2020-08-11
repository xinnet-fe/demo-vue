import { links, addLink, modifyLink, destroyLink } from '@/api/links'

const state = {}

const mutations = {}

const actions = {
  links({ commit }, query) {
    return links(query)
  },
  addLink(_, data) {
    return addLink(data)
  },
  modifyLink(_, data) {
    return modifyLink(data)
  },
  destroyLink(_, ids) {
    return destroyLink(ids)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
