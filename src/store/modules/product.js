import * as api from '@/api/product'

const state = {

}

const mutations = {

}

const actions = {
  productQuery({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.productQuery(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
