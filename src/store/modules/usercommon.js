import * as api from '@/api/usercommon'
import { setStore } from '@/utils/auth'
const state = {
  user: {},
  account: {},
  usersafe: {}
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ACCOUNT: (state, payload) => {
    state.account = payload
  },
  SET_USER_SAFE: (state, res) => {
    state.usersafe = res
  }
}

const actions = {
  getUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const storeUser = getStore('user')
      // if (storeUser && storeUser.id) {
      //   commit('SET_USER', storeUser)
      //   resolve(storeUser)
      // } else {
      api.getUser().then(user => {
        if (!user) {
          reject('please Login again.')
        }
        commit('SET_USER', user.data)
        setStore('user', user.data)
        resolve(user)
      }).catch(error => {
        reject(error)
      })
      // }
    })
  },
  queryMyServices({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryMyServices(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryMsgWorkorder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryMsgWorkorder(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTradeOrderNum({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryTradeOrderNum(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAgentAccount({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.getAgentAccount(payload).then(res => {
        commit('SET_ACCOUNT', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findSafeGrade({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.findSafeGrade(payload).then(res => {
        commit('SET_USER_SAFE', res.data)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryIpAddress({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.queryIpAddress(payload).then(res => {
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
