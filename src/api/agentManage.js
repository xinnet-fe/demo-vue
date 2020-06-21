import request from '@/utils/request'

export function applyList(query) {
  return request({
    url: '/agentManage/applyList',
    method: 'get',
    params: query
  })
}

export function infoList(query) {
  return request({
    url: '/agentManage/infoList',
    method: 'get',
    params: query
  })
}

export function levelList(query) {
  return request({
    url: '/agentManage/levelList',
    method: 'get',
    params: query
  })
}

export function clientList(query) {
  return request({
    url: '/agentManage/clientList',
    method: 'get',
    params: query
  })
}
