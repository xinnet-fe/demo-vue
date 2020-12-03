import request from '@/utils/request'
import querystring from 'querystring'

// 解析阈值列表查询
export function queryNsThresholdList(data) {
  var url = '/nsThreshold/queryNsThresholdList'
  return request({
    url,
    method: 'post',
    data: querystring.stringify(data)
  })
}
