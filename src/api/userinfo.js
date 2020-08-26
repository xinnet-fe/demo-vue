import request from '@/utils/request'

export function getUser(query) {
  return request({
    // url: '/employee/getEmployeeInfo',
    url: 'static/data/account.json',
    method: 'get',
    params: query
  })
}

export function getSidebarMenus(query) {
  return request({
    // url: '/navigation/listNavigation',
    url: 'static/data/menu.json',
    method: 'get',
    params: query
  })
}
// 修改密码
export function changePwd(data) {
  return request({
    url: '/employee/changePwd',
    method: 'post',
    data
  })
}

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

