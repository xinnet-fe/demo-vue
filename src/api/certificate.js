import request from '@/utils/request'
import querystring from 'querystring'

// GoDaddy-列表
export function queryCertificateList(data) {
  var url = '/api/certificate/queryCertificateList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 锐城-列表
export function querySslList(data) {
  var url = '/api/certificate/querySslList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// GoDaddy-详情查询
export function findCertificateByCertId(data) {
  var url = '/api/certificate/findCertificateByCertId'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 锐城-详情查询
export function findSSlNewByCertId(data) {
  var url = '/api/certificate/findSSlNewByCertId'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}