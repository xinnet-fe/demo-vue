import request from '@/utils/request'
import querystring from 'querystring'

// 违规域名查询(全部)
export function queryAllViolateDomainList(data) {
  var url = '/api/violateDomain/queryAllViolateDomainList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 违规域名查询(公安)
export function queryViolateDomainList(data) {
  var url = '/api/violateDomain/queryViolateDomainList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 同模板域名查询(全部)
export function queryAllSameTemplateViolateDomainList(data) {
  var url = '/api/violateDomain/queryAllSameTemplateViolateDomainList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 同模板域名查询(公安)
export function querySameTemplateViolateDomainList(data) {
  var url = '/api/violateDomain/querySameTemplateViolateDomainList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 注册信息查询
export function queryViolateDomainInfo(data) {
  var url = '/api/violateDomain/queryViolateDomainInfo'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 实名模板查询
export function queryViolateDomainTemplate(data) {
  var url = '/api/violateDomain/queryViolateDomainTemplate'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 账号信息查询
export function queryViolateDomainAgent(data) {
  var url = '/api/violateDomain/queryViolateDomainAgent'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 录入违规域名
export function createViolateDomain(data) {
  var url = '/api/violateDomain/createViolateDomain'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 违规域名显示/隐藏
export function setViolateDomain(data) {
  var url = '/api/violateDomain/setViolateDomain'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
