import {
  // ==== 活动规则设置 ====
  // 添加活动
  addPromotions,
  // 查询出的结果（列表）
  queryPromotionsRules,
  // 修改活动
  modifyPromotions,

  // ==== 等级关联活动 ====
  // 获取所有级别名称
  queryAllGrade,
  // 获取所有关联活动
  queryAllAgentPromotion,
  // 查询出的结果（列表）
  queryGradePromotionsRelation,
  // 关联活动（添加）
  gradeRelaPromotion,
  // 查询等级活动交集
  queryGradePromotionsIntersection,
  // 查询等级活动交集
  liftGradePromotionsRelation,

  // ==== 商品关联活动 ====
  // 查询所有产品类别
  queryProductClass,
  // 商品关联活动分页列表
  queryGoodsPromotionsList,
  // 添加商品 -> 根据编号，查询名称
  queryProductNameByCode,
  // 添加商品
  saveProduct,
  // 商品关联活动
  goodsRelatedPromotions,
  // 查询多商品活动交集
  queryGoodsPromotionsIntersection,
  // 解除商品活动
  liftGoodsPromotionsRelation

} from '@/api/promotion'

const state = {
  // ==== 活动规则设置 ====
  // 添加活动
  addPromotions: {},
  // 查询活动条件// 该条件的任意属性更新，都意味着重新获取列表
  ruleQueryWhere: {
    pageNum: 1, // 页码 默认1
    pageSize: 20, // 每页条数 默认20
    ac_now: new Date().getTime() // 添加、修改时，更新列表
  },
  // 查询出的结果（列表）
  queryPromotionsRules: {
    data: {
      list: [], // 列表
      count: 0 // 总数
    }
  },
  // 修改活动
  modifyPromotions: {},

  //  ===== 等级关联活动 =====
  // 获取所有级别名称
  queryAllGrade: {},
  // 获取所有关联活动
  queryAllAgentPromotion: {},
  // 查询活动条件// 该条件的任意属性更新，都意味着重新获取列表
  levelQueryWhere: {
    pageNum: 1, // 页码 默认1
    pageSize: 20, // 每页条数 默认20
    ac_now: new Date().getTime() // 添加、修改时，更新列表
  },
  // 查询出的结果（列表）
  queryGradePromotionsRelation: {
    data: {
      list: [], // 列表
      count: 0 // 总数
    }
  },
  // 关联活动（添加）
  gradeRelaPromotion: {
    data: {
      success: '000',
      goodsNames: []
    }
  },
  // 关联活动（列表页 多选）
  level_multipleSelection: [],
  // 查询等级活动交集
  queryGradePromotionsIntersection: {
    data: {
      agentGradeList: []
    }
  },
  // 解除等级活动
  liftGradePromotionsRelation: {},

  //  ===== 商品关联活动 =====
  // 查询所有产品类别
  queryProductClass: {
    data: []
  },
  // 查询活动条件// 该条件的任意属性更新，都意味着重新获取列表
  commodityQueryWhere: {
    pageNum: 1, // 页码 默认1
    pageSize: 20, // 每页条数 默认20
    ac_now: new Date().getTime() // 添加、修改时，更新列表
  },
  // 商品关联活动分页列表
  queryGoodsPromotionsList: {
    data: {
      list: [], // 列表
      count: 0 // 总数
    }
  },
  // 添加商品 -> 根据编号，查询名称
  queryProductNameByCode: {
    data: {
      goodsName: ''
    }
  },
  // 添加商品
  saveProduct: {
    a: 1
  },
  // 关联活动（列表页 多选）
  commodity_multipleSelection: [],
  // 商品关联活动
  goodsRelatedPromotions: {},
  // 查询多商品活动交集
  queryGoodsPromotionsIntersection: {
    data: {
      intersectPromotList: []
    }
  },
  // 解除商品活动
  liftGoodsPromotionsRelation: {}

}

const mutations = {
  // ==== 活动规则设置 ====
  // 添加活动
  AddPromotions: (state, res) => {
    // console.log('store -> mutations -> 添加活动 res.data=', res.data)
    // 列表页跟着更新
    state.ruleQueryWhere = {
      ...state.ruleQueryWhere,
      ac_now: new Date().getTime() // 它更新，意味着重新获取列表
    }
    // 添加后的数据
    state.addPromotions = res
  },
  // 查询活动条件
  RuleQueryWhere: (state, payload) => {
    // console.log('store -> mutations -> 查询活动条件 payload=', payload)
    // 查询时切到第1页
    let obj = {
      ...state.ruleQueryWhere,
      ...payload,
      pageNum: 1
    }
    if (payload.type === '活动名称') {
      delete obj.reMark
    } else if (payload.type === '备注') {
      delete obj.promotionName
    }
    obj = {
      ...obj,
      ...payload
    }
    delete obj.type
    if (obj.currentEffect === 'no') {
      delete obj.currentEffect
    }
    state.ruleQueryWhere = obj
  },
  // 查询出的结果（列表）
  QueryPromotionsRules: (state, payload) => {
    // console.log('store -> mutations -> （活动规则设置）-查询出的结果（列表） payload=', payload)
    state.queryPromotionsRules = payload
  },
  // 修改活动
  ModifyPromotions: (state, res) => {
    // console.log('store -> mutations -> 添加活动 res.data=', res.data)
    // 列表页跟着更新
    state.ruleQueryWhere = {
      ...state.ruleQueryWhere,
      ac_now: new Date().getTime() // 它更新，意味着重新获取列表
    }
    // 修改后的数据
    state.modifyPromotions = res
  },

  //  ===== 等级关联活动 =====
  // 获取所有级别名称
  QueryAllGrade: (state, res) => {
    state.queryAllGrade = res
  },
  // 获取所有关联活动
  QueryAllAgentPromotion: (state, res) => {
    state.queryAllAgentPromotion = res
  },
  // 查询活动条件
  LevelQueryWhere: (state, payload) => {
    state.levelQueryWhere = {
      ...state.levelQueryWhere,
      ...payload,
      pageNum: 1
    } // 查询时切到第1页
  },
  // 查询出的结果（列表）
  QueryGradePromotionsRelation: (state, payload) => {
    state.queryGradePromotionsRelation = payload
  },
  // 关联活动（添加）
  GradeRelaPromotion: (state, payload) => {
    state.gradeRelaPromotion = payload
  },
  // 关联活动（列表页 多选）
  Level_multipleSelection: (state, payload) => {
    state.level_multipleSelection = payload
  },
  // 查询等级活动交集
  QueryGradePromotionsIntersection: (state, payload) => {
    state.queryGradePromotionsIntersection = payload
  },
  // 解除等级活动
  LiftGradePromotionsRelation: (state, payload) => {
    state.liftGradePromotionsRelation = payload
  },

  //  ===== 商品关联活动 =====
  // 查询所有产品类别
  QueryProductClass: (state, payload) => {
    state.queryProductClass = payload
  },
  // 查询条件
  CommodityQueryWhere: (state, payload) => {
    const obj = {
      ...state.commodityQueryWhere,
      ...payload,
      pageNum: 1 // 查询时切到第1页
    }
    if (obj.type === '商品名称') {
      delete obj.goodsCodes
    } else if (obj.type === '商品编号') {
      delete obj.goodsName
    }
    delete obj.type
    state.commodityQueryWhere = obj
    // console.log('查询条件:', obj)
  },
  // 商品关联活动分页列表
  QueryGoodsPromotionsList: (state, payload) => {
    state.queryGoodsPromotionsList = payload
  },
  // 添加商品 -> 根据编号，查询名称
  QueryProductNameByCode: (state, payload) => {
    state.queryProductNameByCode = payload
  },
  // 添加商品
  SaveProduct: (state, payload) => {
    // 列表页跟着更新
    state.commodityQueryWhere = {
      ...state.commodityQueryWhere,
      ac_now: new Date().getTime() // 它更新，意味着重新获取列表
    }
    // 添加商品
    state.saveProduct = payload
  },
  // 关联活动（列表页 多选）
  Commodity_multipleSelection: (state, payload) => {
    state.commodity_multipleSelection = payload
  },
  // 商品关联活动
  GoodsRelatedPromotions: (state, payload) => {
    // 判断列表是否需要更新
    if (!payload.code) {
      if (payload.data.isSuccess === '1') {
        // 列表页跟着更新
        state.commodityQueryWhere = {
          ...state.commodityQueryWhere,
          ac_now: new Date().getTime() // 它更新，意味着重新获取列表
        }
      }
    }
    // 商品关联活动
    state.goodsRelatedPromotions = payload
  },
  // 查询多商品活动交集
  QueryGoodsPromotionsIntersection: (state, payload) => {
    state.queryGoodsPromotionsIntersection = payload
  },
  // 解除商品活动
  LiftGoodsPromotionsRelation: (state, payload) => {
    state.liftGoodsPromotionsRelation = payload
  }

}

const actions = {
  // ==== 活动规则设置 ====
  // 添加活动
  addPromotions({ commit }, payload) {
    // console.log('store -> addPromotions -> payload:', payload)
    return addPromotions(payload).then(res => commit('AddPromotions', res))
  },
  // 查询条件
  ruleQueryWhere({ commit }, payload) {
    commit('RuleQueryWhere', payload)
  },
  // 查询出的结果（列表）
  queryPromotionsRules({ commit }, payload) {
    return queryPromotionsRules(payload).then(res => commit('QueryPromotionsRules', res))
  },
  // 添加活动
  modifyPromotions({ commit }, payload) {
    // console.log('store -> modifyPromotions -> payload:', payload)
    return modifyPromotions(payload).then(res => commit('ModifyPromotions', res))
  },

  //  ===== 等级关联活动 =====
  // 获取所有级别名称
  queryAllGrade({ commit }, payload) {
    return queryAllGrade(payload).then(res => commit('QueryAllGrade', res))
  },
  // 获取所有关联活动
  queryAllAgentPromotion({ commit }, payload) {
    return queryAllAgentPromotion(payload).then(res => commit('QueryAllAgentPromotion', res))
  },
  // 查询条件
  levelQueryWhere({ commit }, payload) {
    commit('LevelQueryWhere', payload)
  },
  // 查询出的结果（列表）
  queryGradePromotionsRelation({ commit }, payload) {
    return queryGradePromotionsRelation(payload).then(res => commit('QueryGradePromotionsRelation', res))
  },
  // 关联活动（添加）
  gradeRelaPromotion({ commit }, payload) {
    return gradeRelaPromotion(payload).then(res => commit('GradeRelaPromotion', res))
  },
  // 关联活动（列表页 多选）
  level_multipleSelection({ commit }, payload) {
    commit('Level_multipleSelection', payload)
  },
  // 查询等级活动交集
  queryGradePromotionsIntersection({ commit }, payload) {
    return queryGradePromotionsIntersection(payload).then(res => commit('QueryGradePromotionsIntersection', res))
  },
  // 解除等级活动
  liftGradePromotionsRelation({ commit }, payload) {
    return liftGradePromotionsRelation(payload).then(res => commit('LiftGradePromotionsRelation', res))
  },

  //  ===== 商品关联活动 =====
  // 查询所有产品类别
  queryProductClass({ commit }, payload) {
    return queryProductClass(payload).then(res => commit('QueryProductClass', res))
  },
  // 查询条件
  commodityQueryWhere({ commit }, payload) {
    commit('CommodityQueryWhere', payload)
  },
  // 商品关联活动分页列表
  queryGoodsPromotionsList({ commit }, payload) {
    return queryGoodsPromotionsList(payload).then(res => commit('QueryGoodsPromotionsList', res))
  },
  // 添加商品 -> 根据编号，查询名称
  queryProductNameByCode({ commit }, payload) {
    return queryProductNameByCode(payload).then(res => commit('QueryProductNameByCode', res))
  },
  // 添加商品
  saveProduct({ commit }, payload) {
    return saveProduct(payload).then(res => commit('SaveProduct', res))
  },
  // 关联活动（列表页 多选）
  commodity_multipleSelection({ commit }, payload) {
    commit('Commodity_multipleSelection', payload)
  },
  // 商品关联活动
  goodsRelatedPromotions({ commit }, payload) {
    return goodsRelatedPromotions(payload).then(res => commit('GoodsRelatedPromotions', res))
  },
  // 查询多商品活动交集
  queryGoodsPromotionsIntersection({ commit }, payload) {
    return queryGoodsPromotionsIntersection(payload).then(res => commit('QueryGoodsPromotionsIntersection', res))
  },
  // 解除商品活动
  liftGoodsPromotionsRelation({ commit }, payload) {
    return liftGoodsPromotionsRelation(payload).then(res => commit('LiftGoodsPromotionsRelation', res))
  }

}

// 输出
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
