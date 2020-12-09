import * as api from '@/api/apiApply'

const state = {
}

const mutations = {
}

const actions = {
  getApiApplyList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getApiApplyList(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  modifyState({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.modifyState(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  selectApiSettingIps({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.selectApiSettingIps(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addApiAuthIp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.addApiAuthIp(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  deleteSettingById({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.deleteSettingById(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  modifySettingById({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.modifySettingById(payload).then(res => {
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
