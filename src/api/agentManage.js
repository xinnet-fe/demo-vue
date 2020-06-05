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
