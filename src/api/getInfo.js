import request from '@/utils/request'

// 1、虚机/驰云 用户服务 信息查询
export function getinfoListEc(data) {
  var url = '/getinfo/list/ec'
  return request({
    url,
    method: 'get',
    params: data
  })
}

// 2、查询某个虚机/驰云产品下的详细数据
export function getinfoDetailEc(data) {
  var url = '/getinfo/detail/ec'
  return request({
    url,
    method: 'get',
    params: data
  })
}
