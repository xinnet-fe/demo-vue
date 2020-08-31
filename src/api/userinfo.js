import request from '@/utils/request'
import axios from 'axios'

export function getUser(query) {
  return request({
    url: '/employee/getEmployeeInfo',
    method: 'get',
    params: query
  })
}

export function getSidebarMenus(query) {
  return axios({
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
