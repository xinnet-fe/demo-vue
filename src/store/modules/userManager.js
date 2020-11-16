import * as api from '@/api/userManager'

const state = {
  allGrade: [],
  queryFinanclAttrList: [],
  queryOrganSaleList: []
}

const mutations = {
  SET_ALL_GRADE: (state, res) => {
    state.allGrade = res.data
  },
  SET_FINANCL_ATTR_LIST: (state, res) => {
    state.queryFinanclAttrList = res.data
  },
  SET_ORGAN_SALE_LIST: (state, res) => {
    state.queryOrganSaleList = res.data
  }
}

const actions = {
  findDlApply({ commit }, query) {
    return api.findDlApply(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findDlInfo({ commit }, query) {
    return api.findDlInfo(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryDlRealInfo({ commit }, query) {
    return api.queryDlRealInfo(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  breakInfomation({ commit }, query) {
    return api.breakInfomation(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateDlInfomation({ commit }, query) {
    return api.updateDlInfomation(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findAllGrade({ commit }, query) {
    return api.findAllGrade(query).then(res => {
      commit('SET_ALL_GRADE', res)
      return res
    }).catch(error => {
      return error
    })
  },
  batchUpdate({ commit }, query) {
    return api.batchUpdate(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryFinanclAttrList({ commit }, query) {
    return api.queryFinanclAttrList(query).then(res => {
      commit('SET_FINANCL_ATTR_LIST', res)
      return res
    }).catch(error => {
      return error
    })
  },
  queryOrganSaleList({ commit }, query) {
    return api.queryOrganSaleList(query).then(res => {
      commit('SET_ORGAN_SALE_LIST', res)
      return res
    }).catch(error => {
      return error
    })
  },
  queryGradleInfoList({ commit }, query) {
    return api.queryGradleInfoList(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  delGradeById(context, query) {
    return api.delGradeById(query).then(res => {
      context.dispatch('findAllGrade')
      return res
    }).catch(error => {
      return error
    })
  },
  saveGradleInfo(context, query) {
    return api.saveGradleInfo(query).then(res => {
      context.dispatch('findAllGrade')
      return res
    }).catch(error => {
      return error
    })
  },
  updateGradle(context, query) {
    return api.updateGradle(query).then(res => {
      context.dispatch('findAllGrade')
      return res
    }).catch(error => {
      return error
    })
  },
  openAgentUser({ commit }, query) {
    return api.openAgentUser(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryAgentCustomerList(context, query) {
    return api.queryAgentCustomerList(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  unBund({ commit }, query) {
    return api.unBund(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  queryContactList({ commit }, query) {
    return api.queryContactList(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  echoImage({ commit }, query) {
    return api.echoImage(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findActivityAnnounce({ commit }, query) {
    return api.findActivityAnnounce(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  deleteActivityAnnounce({ commit }, query) {
    return api.deleteActivityAnnounce(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  addActivityAnnounce({ commit }, query) {
    return api.addActivityAnnounce(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateActivityAnnounce({ commit }, query) {
    return api.updateActivityAnnounce(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  upload({ commit }, query) {
    return api.upload(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  findAgentContract({ commit }, query) {
    return api.findAgentContract(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  deleteAgentContract({ commit }, query) {
    return api.deleteAgentContract(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  insertAgentContract({ commit }, query) {
    return api.insertAgentContract(query).then(res => {
      return res
    }).catch(error => {
      return error
    })
  },
  updateAgentContract({ commit }, query) {
    return api.updateAgentContract(query).then(res => {
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
