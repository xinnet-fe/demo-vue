import { getUser, getSidebarMenus, changePwd } from '@/api/userinfo'
import { setStore, removeStore } from '@/utils/auth'

const state = {
  user: {
    roles: [],
    permissions: []
  },
  menus: [],
  form: {
    oldpassword: '',
    password: '',
    confirmPassword: '',
    verifcode: ''
  }
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
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
  getUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const storeUser = getStore('user')
      // if (storeUser && storeUser.id) {
      //   commit('SET_USER', storeUser)
      //   resolve(storeUser)
      // } else {
      getUser().then(user => {
        if (!user) {
          reject('please Login again.')
        }

        commit('SET_USER', user)
        setStore('user', user)
        resolve(user)
      }).catch(error => {
        reject(error)
      })
      // }
    })
  },
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
