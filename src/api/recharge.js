import request from '@/utils/request'

export function gatheringDetailPage(query) {
  return request({
    url: '/recharge/gatheringDetailPage',
    method: 'POST',
    data: query
  })
}

