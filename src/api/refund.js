import request from '@/utils/request'
import querystring from 'querystring'

// 1、域名退费列表查询
export function queryRefundList(data) {
  var url = '/domainRefund/queryRefundList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 2、域名退费接口
export function refundOrder(data) {
  var url = '/domainRefund/refundOrder'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
