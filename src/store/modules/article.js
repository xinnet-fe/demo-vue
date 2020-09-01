import { detail, addArticle, modifyArticle, destroyArticle, auditArticle, addWriter, writers } from '@/api/article'
import reduce from 'lodash/reduce'

const state = {
  writers: []
}

const mutations = {
  GET_WRITER: (state, res) => {
    state.writers = reduce(res.data, (r, o) => {
      r.push({
        label: o.name,
        value: o.id
      })
      return r
    }, [])
  }
}

const actions = {
  detail({ commit }, query) {
    return detail(query)
  },
  addArticle(_, data) {
    return addArticle(data)
  },
  modifyArticle(_, data) {
    return modifyArticle(data)
  },
  destroyArticle(_, data) {
    return destroyArticle(data)
  },
  auditArticle(_, data) {
    return auditArticle(data)
  },
  addWriter(_, data) {
    return addWriter(data)
  },
  writers({ commit }, data) {
    return writers(data).then(res => {
      commit('GET_WRITER', res)
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
