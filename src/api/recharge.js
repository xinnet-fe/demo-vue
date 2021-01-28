import request from '@/utils/request'
import querystring from 'querystring'

export function gatheringDetailPage(query) {
  return request({
    url: '/recharge/gatheringDetailPage',
    method: 'POST',
    data: querystring.stringify(query)
  })
}
export function getGatheringModes(query) {
  return request({
    url: '/recharge/getGatheringModes',
    method: 'POST',
    data: query
  })
}


