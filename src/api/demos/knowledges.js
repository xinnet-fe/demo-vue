import request from '@/utils/requests'
// 获取新知文章列表
export function newsList(param) {
  return request({
    url: '/article/list',
    method: 'get',
    params: param
  })
}
// 获取新知文章详情
export function auditDetail(param) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: param
  })
}
// 审核新知文章
export function handleAudit(data) {
  return request({
    url: '/article/audit',
    method: 'post',
    data
  })
}
// 人工通过含有违禁词文章
export function articlePass(data) {
  return request({
    url: '/article/manualAudit',
    method: 'post',
    data
  })
}
// 获取新知广告列表
export function knowledgeList(param) {
  return request({
    url: '/ad/list',
    method: 'get',
    params: param
  })
}
// 添加新知广告
export function knowledgeAdd(data) {
  return request({
    url: '/ad/addormodify',
    method: 'post',
    data
  })
}

// 获取所属栏目接口
export function categoryList() {
  return request({
    url: '/category/list',
    method: 'get'
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
