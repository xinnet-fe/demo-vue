import { login, logout, getInfo } from '@/api/demos/user'
import {
  getToken, setToken, removeToken
} from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { xbtoken } from '@/settings'

const state = {
  token: getToken(),
  xbtoken: getToken('xbtoken') || getToken('xbtoken_id'),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_XBTOKEN: (state, xbtoken) => {
    // boss api token
    state.xbtoken = xbtoken
  },
  SET_TOKEN: (state, token) => {
    // demos token
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken('Admin-Token', data.token)
        commit('SET_XBTOKEN', xbtoken)
        setToken('xbtoken', xbtoken)
        setToken('xbtoken_id', xbtoken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_XBTOKEN', '')
        commit('SET_ROLES', [])
        removeToken('Admin-Token')
        removeToken('xbtoken')
        removeToken('xbtoken_id')
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        dispatch('userinfo/removeUserinfo', null, { root: true })
        dispatch('permission/removePermission', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_XBTOKEN', '')
      commit('SET_ROLES', [])
      removeToken('Admin-Token')
      removeToken('xbtoken')
      removeToken('xbtoken_id')
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      commit('SET_XBTOKEN', token)
      setToken('Admin-Token', token)
      setToken('xbtoken', xbtoken)
      setToken('xbtoken_id', xbtoken)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
