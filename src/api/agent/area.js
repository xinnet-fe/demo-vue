import request from '@/utils/http'

export function getCoreProvice(data) {
  return request({
    url: '/agent/api/area/getCoreProvice',
    // url: 'static/data/city.json',
    method: 'POST',
    data
  })
}