import request from '@/utils/request'

export function getUser(query) {
  return request({
    url: '/employee/getEmployeeInfo',
    method: 'get',
    params: query
  })
}

export function getSidebarMenus(query) {
  return request({
    url: '/navigation/listNavigation',
    method: 'get',
    params: query
  })
}
// 修改密码
export function changePwd(query) {
  return request({
    url: '/employee/changePwd',
    method: 'post',
    params: query
  })
}
