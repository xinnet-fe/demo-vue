import * as api from '@/api/msg'

export default {
  namespaced: true,
  state: {
    unreadMsgCount: 0
  },
  mutations: {
    SET_UNREAD_MSG_COUNT: (state, num) => {
      state.unreadMsgCount = num
    }
  },
  actions: {
    unreadMsgCount(context, payload) {
      return api.unreadMsgCount(payload).then(res => {
        context.commit('SET_UNREAD_MSG_COUNT', res.count)
        return res
      }).catch(error => {
        return error
      })
    },
    list(context, payload) {
      return api.list(payload).then(res => {
        return res
      }).catch(error => {
        return error
      })
    },
    produceMsg(context, payload) {
      return api.produceMsg(payload).then(res => {
        return res
      }).catch(error => {
        return error
      })
    },
    updateStatus(context, payload) {
      return api.updateStatus(payload).then(res => {
        context.dispatch('unreadMsgCount')
        return res
      }).catch(error => {
        return error
      })
    }
  }
}
