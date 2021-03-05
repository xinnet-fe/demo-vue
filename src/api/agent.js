import request from '@/utils/request'

export function getCoreProvice(query) {
  return request({
    url: '/agent/area/getCoreProvice',
    method: 'get',
    params: query
  })
}

export function selectRegionHierarchical(query) {
  return request({
    url: '/agent/performance/selectRegionHierarchical',
    method: 'get',
    params: query
  })
}
export function updateAgentRegion(query) {
  return request({
    url: '/agent/performance/updateAgentRegion',
    method: 'get',
    params: query
  })
}