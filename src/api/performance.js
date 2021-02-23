import request from '@/utils/request'

// 业绩-销售业绩列表
export function queryHyDlSalePerformanceData(query) {
  return request({
    url: '/ui/performance/queryHyDlSalePerformanceData',
    method: 'POST',
    params: query
  })
}
// 业绩-查询产品类型列表
export function queryProductTypeList(query) {
  return request({
    url: '/ui/performance/queryProductTypeList',
    method: 'get',
    params: query
  })
}
// 业绩-查询销售负责人列表
export function querySaleNameList(data) {
  return request({
    url: '/ui/performance/querySaleNameList',
    method: 'post',
    data
  })
}

// 业绩-查询公司列表
export function queryCompanyList(data) {
  return request({
    url: '/ui/performance/queryCompanyList',
    method: 'post',
    data
  })
}

// 业绩-更新销售业绩信息
export function updatePerformance(query) {
  return request({
    url: '/ui/performance/updatePerformance',
    method: 'post',
    params: query
  })
}
// 业绩-会员代理业绩明细导出
export function exportCsv(query) {
  return request({
    url: '/ui/performance/exportCsv',
    method: 'post',
    params: query
  })
}

