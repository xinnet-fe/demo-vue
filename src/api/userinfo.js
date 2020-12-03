import request from '@/utils/request'

export function getUser(query) {
  return request({
    // url: '/employee/getEmployeeInfo',
    url: 'static/domain/data/account.json',
    method: 'get',
    params: query
  })
}

export function getSidebarMenus(query) {
  return request({
    // url: '/navigation/listNavigation',
    url: 'static/domain/data/menu.json',
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
