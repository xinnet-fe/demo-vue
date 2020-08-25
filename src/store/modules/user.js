import { queryAgentCustomerList, sendEmail } from '@/api/user'
// import { setStore, removeStore } from '@/utils/auth'

const state = {
}

const mutations = {
}

const actions = {
  queryAgentCustomerList({ commit, state }) {
    return new Promise((resolve, reject) => {
      queryAgentCustomerList().then(user => {
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendEmail({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendEmail().then(user => {
        resolve(user)
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
