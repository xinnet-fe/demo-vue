/*
 * @Author: your name
 * @Date: 2020-06-03 14:37:36
 * @LastEditTime: 2020-06-12 17:16:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\api\agent\users.js
 */ 
import request from '@/utils/http'

export function selectAgentByParam(query) {
  return request({
    url: '/agent/api/user/selectAgentByParam',
    method: 'POST',
    params: query
  })
}
export function updateAgentPwd(query) {
  return request({
    url: '/agent/api/user/updateAgentPwd',
    method: 'POST',
    params: query
  })
}
export function inviteCustomerRegistered(query) {
  return request({
    url: '/agent/api/user/inviteCustomerRegistered',
    method: 'POST',
    params: query
  })
}
export function inviteCustomerRegister(query) {
  return request({
    url: '/agent/api/user/inviteCustomerRegister',
    method: 'POST',
    params: query
  })
}
export function validPhone(query) {
  return request({
    url: '/agent/api/user/validPhone',
    method: 'POST',
    params: query
  })
}
export function nextStep(query) {
  return request({
    url: '/agent/api/user/nextStep',
    method: 'POST',
    params: query
  })
}
export function registDl(query) {
  return request({
    url: '/agent/api/user/registDl',
    method: 'POST',
    params: query
  })
}
export function genelCaptcha(query) {
  return request({
    url: '/agent/api/user/genelCaptcha',
    method: 'POST',
    params: query
  })
}