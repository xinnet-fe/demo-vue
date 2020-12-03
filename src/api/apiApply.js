import request from '@/utils/request'
import querystring from 'querystring'

// 域名api管理-列表
export function getApiApplyList(data) {
  var url = '/apiApply/getApiApplyList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
    // method: 'get',
    // params: data
  })
}
// 锁定解锁用户
export function modifyState(data) {
  var url = '/apiApply/modifyState'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 查询IP配置列表
export function selectApiSettingIps(data) {
  var url = '/apiApply/selectApiSettingIps'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 添加ip配置
export function addApiAuthIp(data) {
  var url = '/apiApply/addApiAuthIp'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 删除单个ip配置
export function deleteSettingById(data) {
  var url = '/apiApply/deleteSettingById'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
// 修改ip配置
export function modifySettingById(data) {
  var url = '/apiApply/modifySettingById'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
