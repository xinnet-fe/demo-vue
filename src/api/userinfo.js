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
    // url: '/portal/navigation/listNavigation',
    url: '/static/data/menu.json',
    method: 'get',
    params: query
  })
}
// 修改密码
export function changePwd(data) {
  return request({
    url: '/portal/employee/changePwd',
    method: 'post',
    data
  })
}
