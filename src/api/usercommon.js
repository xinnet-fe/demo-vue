import request from '@/utils/request'

export function getUser(query) {
  return request({
    url: '/usercommon/getAgentUser',
    // url: 'static/data/account.json',
    method: 'post',
    params: query
  })
}
export function queryMyServices(query) {
  return request({
    url: '/usercommon/queryMyServices',
    method: 'POST',
    params: query
  })
}
export function queryMsgWorkorder(query) {
  return request({
    url: '/usercommon/queryMsgWorkorder',
    method: 'POST',
    params: query
  })
}
export function queryTradeOrderNum(query) {
  return request({
    url: '/usercommon/queryTradeOrderNum',
    method: 'POST',
    params: query
  })
}
export function getAgentAccount(query) {
  return request({
    url: '/usercommon/getAgentAccount',
    method: 'post',
    params: query
  })
}
export function findSafeGrade(query) {
  return request({
    url: '/usercommon/findSafeGrade',
    method: 'POST',
    params: query
  })
}
// 控制台—查询ip地址数据
export function queryIpAddress(query) {
  return request({
    url: '/usercommon/queryIpAddress',
    method: 'post',
    params: query
  })
}
