import {
  checkAgentCode,
  fetchList,
  // destroyMarket,
  createMarket,
  updateMarket,
  getGoodsList,
  insertMarketingPrice,
  getMarketingPrice,
  delMarketingPrice,
  modifyGoodsPrice // addMarketingPrice
} from '@/api/market'

const state = {
  // 检查名字是否可用
  checkAgentCode: {

  },
  list: [],
  page: {
    total: 0, // 总条数
    page: 1, // 第几页
    limit: 20, // 每页显示多少条
    sort: [{
      property: 'sortIndex',
      direction: 'ASC'
    }],
    pageSizes: [20, 30, 40, 50, 100]
  },
  goodsList: {
    data: [] // 某促销活动中，添加商品时，查询出的列表
  },
  marketGoodsList: [], // 某促销活动，对应的商品列表
  addMarket: {
    code: '',
    msg: ''
  } // 添加促销
}

const mutations = {
  GET_LIST: (state, res) => {
    const { count, list } = res.data
    state.list = list
    state.page.total = count
  },
  // 某促销活动中，添加商品时，查询出的列表
  GetGoodsList: (state, res) => {
    state.goodsList = res
  },
  GetGoodsList_clear: (state, res) => {
    state.goodsList = {
      data: []
    }
  },
  ResetMarketingPrice: (state) => {
    state.marketGoodsList = []
  },
  // 某促销活动，对应的商品列表
  GetMarketingPrice: (state, res) => {
    state.marketGoodsList = res.data.map(item => {
      item.newValue = item.marketingPrice ? parseFloat(item.marketingPrice) : item.marketingPrice // 修改时
      item.newRenewValue = item.marketingRenewPrice ? parseFloat(item.marketingRenewPrice) : item.marketingRenewPrice
      return item
    })
  },
  // 某促销活动，对应的商品列表，修改商品价格完毕时
  ModifyGoodsPrice: (state, res) => {
    state.modifyGoodsPriceRes = res
  },
  // 添加促销
  AddMarket: (state, res) => {
    state.addMarket = res
  },
  // 修改促销
  UpdateMarket: (state, res) => {
    state.updateMarket = res
  },
  // 添加促销（检查名字）
  CheckAgentCode: (state, res) => {
    state.checkAgentCode = res
  },
  // 删除促销商品
  DelMarketingPriceRes: (state, res) => {
    state.delMarketingPriceRes = res
  }
}

const actions = {
  checkAgentCode({ commit }, query) {
    return checkAgentCode(query).then(res => commit('CheckAgentCode', res))
  },
  getList({ commit }, query) {
    return fetchList(query).then(res => commit('GET_LIST', res))
  },
  // destroyMarket(_, ids) {
  // return destroyMarket(ids)
  // },
  addMarket({ commit }, data) {
    return createMarket(data).then(res => commit('AddMarket', res))
  },
  updateMarket({ commit }, data) {
    return updateMarket(data).then(res => commit('UpdateMarket', res))
  },
  // 促销活动中添加商品时的列表
  getGoodsList({ commit }, query) {
    return getGoodsList(query).then(res => commit('GetGoodsList', res))
  },
  // 某促销活动，对应的商品列表
  getMarketingPrice({ commit }, query) {
    return getMarketingPrice(query).then(res => commit('GetMarketingPrice', res))
  },
  // 某促销活动，对应的商品列表，修改商品价格
  modifyGoodsPrice({ commit }, query) {
    return modifyGoodsPrice(query).then(res => commit('ModifyGoodsPrice', res))
  },
  // 将所选的商品，添加到某促销活动上
  insertMarketingPrice({ commit }, query) {
    return insertMarketingPrice(query).then(res => {
      delete query.requestJson
      return getMarketingPrice(query)
    }).then(res => commit('GetMarketingPrice', res))
  },
  // 某促销活动的对应商品，删除指定的商品
  delMarketingPrice({ commit }, query) {
    // return delMarketingPrice(query).then(res => getMarketingPrice(query)).then(res => commit('GetMarketingPrice', res))
    return delMarketingPrice(query).then(res => commit('DelMarketingPriceRes', res))
  },
  // 清空
  getGoodsList_clear({ commit }, query) {
    commit('GetGoodsList_clear', query)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
