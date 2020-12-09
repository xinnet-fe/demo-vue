import request from '@/utils/request'

export function getTransactionType(query) {
  return request({
    url: '/account/accountDetail/getTransactionType',
    method: 'POST',
    data: query
  })
}
export function list(query) {
  return request({
    url: '/account/accountDetail/list',
    method: 'POST',
    params: query
  })
}
export function billQuery(query) {
  return request({
    url: '/account/accountDetail/billQuery',
    method: 'POST',
    params: query
  })
}
