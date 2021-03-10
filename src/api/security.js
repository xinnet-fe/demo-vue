import request from '@/utils/request'

// 客户详情-产品服务信息-王志军
export function getProductsByCustId(query) {
  return request({
    url: '/security/productInstance/getProductsByCustId',
    method: 'get',
    params: query
  })
}
// 客户详情-跟进服务记录-管家跟进记录-王志军
export function getServiceInfos(query) {
  return request({
    url: '/security/gj/serviceInfo/getServiceInfos',
    method: 'get',
    params: query
  })
}
// 客户详情-跟进服务记录-商务跟进记录-王志军
export function getVisitLogs(query) {
  return request({
    url: '/security/visitlog/getVisitLogs',
    method: 'get',
    params: query
  })
}
// 客户详情-消费信息-老boss订单-王志军
export function findBossOrder(query) {
  return request({
    url: '/security/custdetail/findBossOrder',
    method: 'get',
    params: query
  })
}
// 客户详情-消费信息-新业务平台订单-王志军
export function findOrderInfoByCustId(query) {
  return request({
    url: '/security/custdetail/findOrderInfoByCustId',
    method: 'get',
    params: query
  })
}
// 客户详情-基本信息-王志军
export function getCustomerDetailAndProtectById(query) {
  return request({
    url: '/security/newcustomer/getCustomerDetailAndProtectById',
    method: 'get',
    params: query
  })
}

