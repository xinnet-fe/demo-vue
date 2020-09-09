import request from '@/utils/request'

export function getUser(query) {
  return request({
    url: '/userinfo/getAgentUser',
    // url: 'static/data/account.json',
    method: 'post',
    params: query
  })
}
export function getAgentAccount(query) {
  return request({
    url: '/userinfo/getAgentAccount',
    method: 'post',
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
// 控制台—查询ip地址数据
export function queryIpAddress(query) {
  return request({
    url: '/userinfo/queryIpAddress',
    method: 'post',
    params: query
  })
}

