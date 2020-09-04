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
export function queryAgentCustomerList(query) {
  return request({
    url: '/agent/api/user/queryAgentCustomerList',
    // url: 'static/data/user/AgentCustomerList.json',
    method: 'get',
    params: query
  })
}

export function sendEmail(query) {
  return request({
    url: '/agent/api/user/sendEmail',
    // url: 'static/data/user/sendEmail.json',
    method: 'GET',
    params: query
  })
}
export function findGradeByAgent(query) {
  return request({
    url: '/agent/api/user/findGradeByAgent',
    method: 'GET',
    params: query
  })
}
export function findDlCustomer(query) {
  return request({
    url: '/agent/api/user/findDlCustomer',
    method: 'POST',
    params: query
  })
}
