import * as api from '@/api/getInfo'

const state = {
  getinfoListVhost: {
    data: {
      infos: []
    }
  },
  getinfoDetailVhost: {
    data: {
      databases: []
    }
  }
}

const mutations = {
  GETINFOLISTVHOST: (state, res) => {
    state.getinfoListVhost = res
  },
  GETINFODETAILVHOST: (state, res) => {
    state.getinfoDetailVhost = res
  }
}

const actions = {
  getinfoListVhost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getinfoListVhost(payload).then(res => {
        if (res.success) {
          commit('GETINFOLISTVHOST', res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getinfoDetailVhost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getinfoDetailVhost(payload).then(res => {
        if (res.success) {
          commit('GETINFODETAILVHOST', res)
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
