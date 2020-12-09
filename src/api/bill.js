import request from '@/utils/request'

export function billList(query) {
  return request({
    url: '/api/bill/query/list',
    method: 'POST',
    params: query
  })
}
export function ExportExcel(query) {
  return request({
    url: '/api/bill/query/exportExcel',
    method: 'get',
    params: query
  })
}
