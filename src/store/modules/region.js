import * as api from '@/api/region'

const state = {
}

const mutations = {

}

const actions = {
  selectRegionData(context, payload) {
    return api.selectRegionData(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  addRegionData(context, payload) {
    return api.addRegionData(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  selectRegionDataDropDown(context, payload) {
    return api.selectRegionDataDropDown(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateRegionData(context, payload) {
    return api.updateRegionData(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  selectEhrData(context, payload) {
    return api.selectEhrData(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  selectDirectorRecord(context, payload) {
    return api.selectDirectorRecord(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateRegionNameById(context, payload) {
    return api.updateRegionNameById(payload).then(res => {
      return res
    }).catch(error => {
      return error
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
