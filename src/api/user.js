import request from '@/utils/request'

export function queryAgentCustomerList(query) {
  return request({
    // url: '/agent/api/user/queryAgentCustomerList',
    url: 'static/data/user/AgentCustomerList.json',
    method: 'get',
    params: query
  })
}

export function sendEmail(query) {
  return request({
    // url: '/agent/api/user/sendEmail',
    url: 'static/data/user/sendEmail.json',
    method: 'GET',
    params: query
  })
}

