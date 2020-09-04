import request from '@/utils/http'

export function queryDlActivityOrAnnounce(query) {
  return request({
    url: '/agent/api/announce/queryDlActivityOrAnnounce',
    method: 'get',
    params: query
  })
}
export function queryContentById(query) {
  return request({
    url: '/agent/api/announce/queryContentById',
    method: 'POST',
    params: query
  })
}
export function findDlActivityAnnounce(query) {
  return request({
    url: '/agent/api/announce/findDlActivityAnnounce',
    method: 'POST',
    params: query
  })
}
