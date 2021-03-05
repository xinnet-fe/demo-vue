import * as api from '@/api/msg'

export default {
  namespaced: true,
  state: {
    unreadMsgCount: 0,
    msgList: []
  },
  mutations: {
    SET_UNREAD_MSG_COUNT: (state, num) => {
      state.unreadMsgCount = num
    },
    SET_MSG_LIST: (state, list) => {
      state.msgList = list
    }
  },
  actions: {
    unreadMsgCount(context, payload) {
      return api.unreadMsgCount(payload).then(res => {
        context.commit('SET_UNREAD_MSG_COUNT', res.count)
        context.dispatch('list', {
          msgType: '',
          isShow: '01',
          pageNum: 1,
          pageSize: 6
        })
        return res
      }).catch(error => {
        return error
      })
    },
    list(context, payload) {
      return api.list(payload).then(res => {
        if (payload.isShow === '01') {
          context.commit('SET_MSG_LIST', res.list)
        }
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
        if (payload.updateType !== '3') { // ===3清空pop层数据，不拉新数据
          context.dispatch('unreadMsgCount')
        }
        return res
      }).catch(error => {
        return error
      })
    }
  }
}
