import * as api from '@/api/agent/users'

const state = {
}

const mutations = {
}

const actions = {
  // 代理商编号和手机号查询是否存在
  selectAgentByParam({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.selectAgentByParam(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改用户密码
  updateAgentPwd({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.updateAgentPwd(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 邀请已注册用户
  inviteCustomerRegistered({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.inviteCustomerRegistered(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 代理商邀请未注册用户
  inviteCustomerRegister({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.inviteCustomerRegister(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 代理商邮箱和手机号查询是否存在
  validPhoneOrMail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.validPhoneOrMail(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重置密码下一步接口
  nextStep({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.nextStep(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 代理商注册接口
  registDl({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api.registDl(payload).then(response => {
        resolve(response)
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
