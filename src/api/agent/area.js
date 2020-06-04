import request from '@/utils/request'

export function getCoreProvice(query) {
  return request({
    url: '/area/getCoreProvice',
    method: 'POST',
    params: query
  })
}
export function registDl(query) {
  return request({
    url: '/agent/user/registDl',
    method: 'POST',
    params: query
  })
}