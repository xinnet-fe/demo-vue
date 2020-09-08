import request from '@/utils/request'

export function queryMyServices(query) {
  return request({
    url: '/usercommon/queryMyServices',
    method: 'POST',
    params: query
  })
}
export function queryMsgWorkorder(query) {
  return request({
    url: '/usercommon/queryMsgWorkorder',
    method: 'POST',
    params: query
  })
}
