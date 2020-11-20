import request from '@/utils/request'

export function getUser(query) {
  return request({
    url: '/refundProduct/employee/getEmployeeInfo',
    // url: 'static/vhost/data/account.json',
    method: 'get',
    params: query
  })
}

export function getSidebarMenus(query) {
  return request({
    // url: '/navigation/listNavigation',
    url: 'static/vhost/data/menu.json',
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
