import request from '@/utils/request'
import requests from '@/utils/requests'

// 用户列表
export function getUsermanage(query) {
  return requests({
    url: '/usermanage/user/list',
    method: 'get',
    params: query
  })
}

// 分公司列表
export function getCompany(query) {
  return request({
    url: '/usermanage/company/list',
    method: 'get',
    params: query
  })
}

// 注册渠道列表
export function getChannel(query) {
  return request({
    url: '/usermanage/channel/list',
    method: 'get',
    params: query
  })
}

// 编辑手机号、邮箱 usermanage/user/modify
export function getUserModify(query) {
  return request({
    url: '/usermanage/user/modify',
    method: 'get',
    params: query
  })
}

// 用户锁定  /usermanage/user/lock
export function getUserLock(query) {
  return request({
    url: '/usermanage/user/lock',
    method: 'get',
    params: query
  })
}

// 用户解锁  usermanage/user/unlock
export function getUserUnlock(query) {
  return request({
    url: '/usermanage/user/unlock',
    method: 'get',
    params: query
  })
}

// 取消用户口令  /usermanage/user/cancelDynamicCode
export function getUserCancelDynamicCode(query) {
  return request({
    url: '/usermanage/user/cancelDynamicCode',
    method: 'get',
    params: query
  })
}

// 注销用户  /usermanage/user/cancelAccount
export function getUserCancelAccount(query) {
  return request({
    url: '/usermanage/user/cancelAccount',
    method: 'get',
    params: query
  })
}

// 用户详情  /usermanage/user/detail
export function getUserDetail(query) {
  return request({
    url: '/usermanage/user/detail',
    method: 'get',
    params: query
  })
}

// 查看是否绑定其他账号邮箱  /usermanage/user/ifExistEmail
export function getUserIfExistEmail(query) {
  return request({
    url: '/usermanage/user/ifExistEmail',
    method: 'get',
    params: query
  })
}

// 查看是否绑定其他账号手机  /usermanage/user/ifExistPhoneNum
export function getUserIfExistPhoneNum(query) {
  return request({
    url: '/usermanage/user/ifExistPhoneNum',
    method: 'get',
    params: query
  })
}

// 获取用户类型下拉
export function getUserGetUserTypeList(query) {
  return request({
    url: '/usermanage/user/getUserTypeList',
    method: 'get',
    params: query
  })
}

// 获取账号状态下拉
export function getUserGetAccountStateList(query) {
  return request({
    url: '/usermanage/user/getAccountStateList',
    method: 'get',
    params: query
  })
}
