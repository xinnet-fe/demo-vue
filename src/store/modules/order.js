import { fetchList, destroyOrder, createOrder, updateOrder } from '@/api/order'
import convertNameByValue from '@/utils/convertNameByValue'
import forEach from 'lodash/forEach'
// import formatTime from '@/utils/formatTime'

const state = {
  list: [],
  page: {
    total: 0,
    page: 1,
    limit: 10
  }
}

const mutations = {
  GET_LIST: (state, res) => {
    const { data, page } = res.data
    const options = { beijing: '北京', shanghai: '上海' }
    forEach(data, row => {
      convertNameByValue('region', 'regionName', options, row)
      // row.datetime = formatTime(row.datetime)
    })
    state.list = data
    state.page = page
  }
}

const actions = {
  getList({ commit }, query) {
    return fetchList(query).then(res => commit('GET_LIST', res))
  },
  destroyOrder(_, ids) {
    return destroyOrder(ids)
  },
  addOrder(_, data) {
    return createOrder(data)
  },
  updateOrder(_, data) {
    return updateOrder(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
