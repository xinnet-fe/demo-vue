import request from '@/utils/request'
// import requests from '@/utils/requests'
// import axios from 'axios'

// const basePath = process.env.NODE_ENV === 'development' ? '' : '/admin'

// export function getUser(query) {
//   return axios.get(`${basePath}/static/user.json`).then(res => res.data)
// }

// export function getSidebarMenus(query) {
//   return axios.get(`${basePath}/static/menus.json`).then(res => res.data)
// }

export function getUser(query) {
  return request({
    url: '/employee/getEmployeeInfo',
    // url: 'static/data/account.json',
    method: 'get',
    params: query
  })
}

export function getSidebarMenus(query) {
  return request({
    url: '/navigation/listNavigation',
    // url: 'static/data/menu.json',
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
