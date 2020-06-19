import request from '@/utils/requests'

export function newsList(param) {
  return request({
    url: '/article/list',
    method: 'get',
    params: param
  })
}

export function auditDetail(param) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: param
  })
}

export function handleAudit(data) {
  return request({
    url: '/article/audit',
    method: 'post',
    data
  })
}

export function knowledgeList(param) {
  return request({
    url: '/ad/list',
    method: 'get',
    params: param
  })
}

export function knowledgeAdd(data) {
  return request({
    url: '/ad/addormodify',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
