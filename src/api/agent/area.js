import request from '@/utils/request'

export function getCoreProvice(query) {
  return request({
    url: '/area/getCoreProvice',
    method: 'POST',
    params: query
  })
}