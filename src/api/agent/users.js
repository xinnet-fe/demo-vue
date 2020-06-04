import request from '@/utils/request'

export function selectAgentByParam(query) {
  return request({
    url: '/agent/user/selectAgentByParam',
    method: 'POST',
    params: query
  })
}
export function updateAgentPwd(query) {
  return request({
    url: '/agent/user/updateAgentPwd',
    method: 'POST',
    params: query
  })
}
export function inviteCustomerRegistered(query) {
  return request({
    url: '/agent/user/inviteCustomerRegistered',
    method: 'POST',
    params: query
  })
}
export function inviteCustomerRegister(query) {
  return request({
    url: '/agent/user/inviteCustomerRegister',
    method: 'POST',
    params: query
  })
}
export function validPhoneOrMail(query) {
  return request({
    url: '/agent/user/validPhoneOrMail',
    method: 'POST',
    params: query
  })
}
export function nextStep(query) {
  return request({
    url: '/agent/user/nextStep',
    method: 'POST',
    params: query
  })
}
export function registDl(query) {
  return request({
    url: '/agent/user/registDl',
    method: 'POST',
    params: query
  })
}