import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/realnamequery/upload',
    method: 'POST',
    data
  })
}
export function comparePortrait(query) {
  return request({
    url: '/realnamequery/comparePortrait',
    method: 'POST',
    params: query
  })
}
export function compareEnterpriseInfo(query) {
  return request({
    url: '/realnamequery/compareEnterpriseInfo',
    method: 'POST',
    params: query
  })
}
