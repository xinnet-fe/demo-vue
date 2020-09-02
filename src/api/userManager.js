import request from '@/utils/request'
// 代理开通接口
export function openAgentUser(query) {
  return request({
    url: '/userManager/openAgentUser',
    method: 'POST',
    params: query
  })
}
// 财务归属查询列表（不分页）
export function queryFinanclAttrList(query) {
  return request({
    url: '/userManager/queryFinanclAttrList',
    method: 'POST',
    params: query
  })
}
// 联系人信息查询接口（不分页）
export function queryContactList(query) {
  return request({
    url: '/userManager/queryContactList',
    method: 'POST',
    params: query
  })
}
// 代理商客户管理查询接口
export function queryAgentCustomerList(query) {
  return request({
    url: '/userManager/queryAgentCustomerList',
    method: 'POST',
    params: query
  })
}
// 查询分公司列表，分公司销售列表
export function queryOrganSaleList(query) {
  return request({
    url: '/userManager/queryOrganSaleList',
    method: 'POST',
    params: query
  })
}
// 查询级别信息列表（分页）
export function queryGradleInfoList(query) {
  return request({
    url: '/userManager/queryGradleInfoList',
    method: 'POST',
    params: query
  })
}
// 保存级别信息
export function saveGradleInfo(query) {
  return request({
    url: '/userManager/saveGradleInfo',
    method: 'POST',
    params: query
  })
}
// 代理申请查询接口（分页）
export function findDlApply(query) {
  return request({
    url: '/userManager/findDlApply',
    method: 'POST',
    params: query
  })
}
// 代理商批量修改业务归属财务归属，修改级别
export function batchUpdate(query) {
  return request({
    url: '/userManager/batchUpdate',
    method: 'POST',
    params: query
  })
}
// 代理商修改账号
export function updateDlInfomation(query) {
  return request({
    url: '/userManager/updateDlInfomation',
    method: 'POST',
    params: query
  })
}
// 代理商终止
export function breakInfomation(agentCode) {
  return request({
    url: '/userManager/breakInfomation',
    method: 'POST',
    params: agentCode
  })
}
// 代理商详情实名制信息
export function queryDlRealInfo(agentCode) {
  return request({
    url: '/userManager/queryDlRealInfo',
    method: 'POST',
    params: agentCode
  })
}
// 代理商客户管理--解绑
export function unBund(query) {
  return request({
    url: '/userManager/unBund',
    method: 'POST',
    params: query
  })
}
// 代理商信息查询(分页)
export function findDlInfo(query) {
  return request({
    url: '/userManager/findDlInfo',
    method: 'POST',
    params: query
  })
}
// 查询所有等级
export function findAllGrade(query) {
  return request({
    url: '/userManager/findAllGrade',
    method: 'POST',
    params: query
  })
}
// 代理商等级管理--修改
export function updateGradle(query) {
  return request({
    url: '/userManager/updateGradle',
    method: 'POST',
    params: query
  })
}
// 代理商等级管理--删除级别
export function delGradeById(query) {
  return request({
    url: '/userManager/delGradeById',
    method: 'POST',
    params: query
  })
}
// 返回图片
export function echoImage(query) {
  return request({
    url: '/userManager/echoImage',
    method: 'get',
    params: query
  })
}
// 查询活动公告信息
export function findActivityAnnounce(query) {
  return request({
    url: '/userManager/findActivityAnnounce',
    method: 'post',
    params: query
  })
}
// 删除公告活动
export function deleteActivityAnnounce(query) {
  return request({
    url: '/userManager/deleteActivityAnnounce',
    method: 'get',
    params: query
  })
}
// 添加公告活动
export function addActivityAnnounce(query) {
  return request({
    url: '/userManager/addActivityAnnounce',
    method: 'post',
    params: query
  })
}
// 修改公告活动
export function updateActivityAnnounce(query) {
  return request({
    url: '/userManager/updateActivityAnnounce',
    method: 'post',
    params: query
  })
}
