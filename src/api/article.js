import requests from '@/utils/requests'

export function detail(query) {
  return requests({
    url: '/article/detail',
    method: 'get',
    params: query
  })
}

export function addArticle(data) {
  return requests({
    url: '/article/add',
    method: 'post',
    data
  })
}

export function modifyArticle(data) {
  return requests({
    url: '/article/modify',
    method: 'post',
    data
  })
}
