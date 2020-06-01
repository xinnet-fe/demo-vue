import request from '@/utils/request'

export function applyList(query) {
  return request({
    url: '/agentManage/applyList',
    method: 'get',
    params: query
  })
}
