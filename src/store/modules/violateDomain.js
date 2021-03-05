import * as api from '@/api/violateDomain'

const state = {
}

const mutations = {
}

const actions = {
  queryAllViolateDomainList({ commit }, payload) {
    return api.queryAllViolateDomainList(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  queryViolateDomainList({ commit }, payload) {
    return api.queryViolateDomainList(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  queryAllSameTemplateViolateDomainList({ commit }, payload) {
    return api.queryAllSameTemplateViolateDomainList(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  querySameTemplateViolateDomainList({ commit }, payload) {
    return api.querySameTemplateViolateDomainList(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  queryViolateDomainInfo({ commit }, payload) {
    return api.queryViolateDomainInfo(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  queryViolateDomainTemplate({ commit }, payload) {
    return api.queryViolateDomainTemplate(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  queryViolateDomainAgent({ commit }, payload) {
    return api.queryViolateDomainAgent(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  createViolateDomain({ commit }, payload) {
    return api.createViolateDomain(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
  setViolateDomain({ commit }, payload) {
    return api.setViolateDomain(payload).then(res => {
      return res
    }).catch(err => {
      return err
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
