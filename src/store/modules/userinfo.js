import { getSidebarMenus, changePwd } from '@/api/userinfo'
import { queryAgentCustomerList, sendEmail, findGradeByAgent, findDlCustomer } from '@/api/agent/users'
import { setStore, removeStore } from '@/utils/auth'

const state = {
  menus: [],
  commonMenus: {
    menuData: []
  },
  gradeByAgent: {},
  form: {
    oldpassword: '',
    password: '',
    confirmPassword: '',
    verifcode: ''
  }
}

const mutations = {
  SET_GRADE_BY_AGENT: (state, res) => {
    state.gradeByAgent = res
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_COMMON_MENUS: (state, menus) => {
    state.commonMenus = menus
  },
  SET_PWD: (state, payload) => {
    state.form.oldpassword = payload.originalPwd
    state.form.password = payload.newPwd
    state.form.confirmPassword = payload.confirmPwd
    state.form.verifcode = payload.mobileyzm
  },
  CLEAR_PWD_FORM(state) {
    state.form.oldpassword = ''
    state.form.password = ''
    state.form.confirmPassword = ''
    state.form.verifcode = ''
  }
}

const actions = {
  // get user info
  getSidebarMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const storeMenus = getStore && getStore('menus')
      // if (storeMenus && storeMenus.length) {
      //   commit('SET_MENUS', storeMenus)
      //   resolve(storeMenus)
      // } else {
      const query = {
        resourceCode: 'xinnet-boss-navigation',
        appCode: 'xinnet-boss'
      }
      getSidebarMenus(query).then(menus => {
        if (!menus || !menus.length) {
          reject('no menus.')
        }

        commit('SET_MENUS', menus)
        setStore('menus', menus)
        resolve(menus)
      }).catch(error => {
        reject(error)
      })
      // }
    })
  },

  removeUserinfo({ commit }) {
    commit('SET_USER', {})
    commit('SET_MENUS', [])
    removeStore('user')
    removeStore('menus')
  },

  // 修改密码
  resetPwd({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      changePwd(payload).then(form => {
        commit('SET_PWD', form)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  clearPwdForm({ commit }) {
    commit('CLEAR_PWD_FORM')
  },
  queryAgentCustomerList({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      queryAgentCustomerList(payload).then(user => {
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendEmail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      sendEmail(payload).then(user => {
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findGradeByAgent({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      findGradeByAgent(payload).then(res => {
        commit('SET_GRADE_BY_AGENT', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findDlCustomer({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      findDlCustomer(payload).then(res => {
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
