import request from '@/utils/request'
import axios from 'axios'

export function getUser(query) {
  return request({
    url: '/admin/employee/getEmployeeInfo',
    method: 'get',
    params: query
  })
}

const sidebarMenusUrl = process.env.NODE_ENV === 'development' ? '/static/data/menu.json' : '/admin/static/data/menu.json'
export function getSidebarMenus(query) {
  return axios({
    // url: '/portal/navigation/listNavigation',
    url: sidebarMenusUrl,
    method: 'get',
    params: query
  }).then(res => res.data)
}
// 修改密码
export function changePwd(data) {
  return request({
    url: '/portal/employee/changePwd',
    method: 'post',
    data
  })
}
