import request from '@/utils/request'
import querystring from 'querystring'

// 域名api管理-列表
export function getApiApplyList(data) {
  var url = '/apiApply/getApiApplyList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
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
