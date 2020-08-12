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

export function destroyArticle(actId) {
  return requests({
    url: '/article/delete',
    method: 'post',
    params: {
      actId
    }
  })
}

export function auditArticle(data) {
  return requests({
    url: '/article/audit',
    method: 'post',
    data
  })
}

export function addWriter(data) {
  return requests({
    url: '/writer/add',
    method: 'post',
    data
  })
}

export function writers(data) {
  return requests({
    url: '/writer/list',
    method: 'get',
    data
  })
}
