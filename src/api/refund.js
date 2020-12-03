import request from '@/utils/request'
import querystring from 'querystring'

// （常规退费）
// 1、域名退费列表查询
export function queryRefundList(data) {
  var url = '/api/domainRefund/queryRefundList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 2、域名退费接口
export function refundOrder(data) {
  var url = '/api/domainRefund/refundOrder'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}

// （特殊退费）

// 1、域名退费列表查询
export function querySpecRefundList(data) {
  var url = '/api/domainRefund/querySpecRefundList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 2、域名退费接口
export function refundSpecOrder(data) {
  var url = '/api/domainRefund/refundSpecOrder'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
