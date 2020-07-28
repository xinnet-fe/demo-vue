import request from '@/utils/request'
import querystring from 'querystring'

// 图表概览
export function getOverviewSize(data) {
  return request({
    url: '/dapan/getOverviewSize',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 大盘数据图
export function getCurve(data) {
  return request({
    url: '/dapan/getCurve',
    method: 'post',
    data
  })
}

// 大盘明细图
export function getDetailedCurve(data) {
  return request({
    url: '/dapan/getDetailedCurve',
    method: 'post',
    data
  })
}
