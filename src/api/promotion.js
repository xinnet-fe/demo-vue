import request from '@/utils/request'
import querystring from 'querystring'

const baseurl = '/promotion'

// ===== 活动规则设置 =====
// 添加活动
export function addPromotions(data) {
  return request({
    url: baseurl + '/addPromotions',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 查询出的结果（列表）
export function queryPromotionsRules(data) {
  return request({
    url: baseurl + '/queryPromotionsRules',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 修改活动
export function modifyPromotions(data) {
  return request({
    url: baseurl + '/modifyPromotions',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// ===== 等级关联活动 =====
// 获取所有级别名称
export function queryAllGrade(data) {
  return request({
    url: baseurl + '/queryAllGrade',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 获取所有关联活动
export function queryAllAgentPromotion(data) {
  return request({
    url: baseurl + '/queryAllAgentPromotion',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 查询出的结果（列表）
export function queryGradePromotionsRelation(data) {
  return request({
    url: baseurl + '/queryGradePromotionsRelation',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 关联活动
export function gradeRelaPromotion(data) {
  return request({
    url: baseurl + '/gradeRelaPromotion',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 查询等级活动交集
export function queryGradePromotionsIntersection(data) {
  return request({
    url: baseurl + '/queryGradePromotionsIntersection',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 解除等级活动
export function liftGradePromotionsRelation(data) {
  return request({
    url: baseurl + '/liftGradePromotionsRelation',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// ===== 商品关联活动 =====
// 查询所有产品类别
export function queryProductClass(data) {
  return request({
    url: baseurl + '/queryProductClass',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 商品关联活动分页列表
export function queryGoodsPromotionsList(data) {
  return request({
    url: baseurl + '/queryGoodsPromotionsList',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 添加商品 -> 根据编号，查询名称
export function queryProductNameByCode(data) {
  return request({
    url: baseurl + '/queryProductNameByCode',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 添加商品
export function saveProduct(data) {
  return request({
    url: baseurl + '/saveProduct',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 商品关联活动
export function goodsRelatedPromotions(data) {
  return request({
    url: baseurl + '/goodsRelatedPromotions',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 查询多商品活动交集
export function queryGoodsPromotionsIntersection(data) {
  return request({
    url: baseurl + '/queryGoodsPromotionsIntersection',
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 解除商品活动
export function liftGoodsPromotionsRelation(data) {
  return request({
    url: baseurl + '/liftGoodsPromotionsRelation',
    method: 'post',
    data: querystring.stringify(data)
  })
}
