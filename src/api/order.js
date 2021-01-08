import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query
  })
}

export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}

export function destroyOrder(ids) {
  return request({
    url: '/order/destroy',
    method: 'delete',
    params: { ids }
  })
}
