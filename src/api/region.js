import request from '@/utils/request'

// 业绩-查询区域管理列表
export function selectRegionData(query) {
  return request({
    url: '/ui/region/selectRegionData',
    method: 'POST',
    params: query
  })
}
// 业绩-添加区域数据
export function addRegionData(query) {
  return request({
    url: '/ui/region/addRegionData',
    method: 'POST',
    params: query
  })
}
// 业绩-区域新增下拉列表
export function selectRegionDataDropDown(query) {
  return request({
    url: '/ui/region/selectRegionDataDropDown',
    method: 'POST',
    params: query
  })
}

// 业绩-更新区域负责人
export function updateRegionData(query) {
  return request({
    url: '/ui/region/updateRegionData',
    method: 'POST',
    params: query
  })
}

// 业绩-ehr系统销售查询
export function selectEhrData(query) {
  return request({
    url: '/ui/region/selectEhrData',
    method: 'POST',
    params: query
  })
}
// 业绩-查询负责人历史记录
export function selectDirectorRecord(query) {
  return request({
    url: '/ui/region/selectDirectorRecord',
    method: 'POST',
    params: query
  })
}
// 业绩-更新区域名称
export function updateRegionNameById(query) {
  return request({
    url: '/ui/region/updateRegionNameById',
    method: 'POST',
    params: query
  })
}

