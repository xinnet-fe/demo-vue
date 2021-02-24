import request from '@/utils/request'

// 未读消息数量查询
export function unreadMsgCount(query) {
  return request({
    url: '/msg/unreadMsgCount',
    method: 'get',
    params: query
  })
}
// 查询消息列表查询接口
export function list(query) {
  return request({
    url: '/msg/list',
    method: 'get',
    params: query
  })
}
// 生产消息接口
export function produceMsg(data) {
  return request({
    url: '/msg/produceMsg',
    method: 'post',
    data
  })
}
// 更新消息状态接口
export function updateStatus(query) {
  return request({
    url: '/msg/updateStatus',
    method: 'post',
    params: query
  })
}
