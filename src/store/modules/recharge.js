import * as api from '@/api/recharge'

const state = {

}

const mutations = {

}

const actions = {
  gatheringDetailPage({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.gatheringDetailPage(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGatheringModes({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      api.getGatheringModes(query).then(res => {
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
