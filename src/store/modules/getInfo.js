import * as api from '@/api/getInfo'

const state = {
  getinfoListEc: {
    data: {
      infos: []
    }
  },
  getinfoDetailEc: {
    data: {
      databases: []
    }
  }
}

const mutations = {
  GETINFOLISTEC: (state, res) => {
    state.getinfoListEc = res
  },
  GETINFODETAILEC: (state, res) => {
    state.getinfoDetailEc = res
  }
}

const actions = {
  getinfoListEc({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getinfoListEc(payload).then(res => {
        if (res.success) {
          commit('GETINFOLISTEC', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getinfoDetailEc({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getinfoDetailEc(payload).then(res => {
        if (res.success) {
          commit('GETINFODETAILEC', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
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
