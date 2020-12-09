import request from '@/utils/request'

export function productQuery(query) {
  return request({
    url: '/api/product/query',
    method: 'POST',
    params: query
  })
}

