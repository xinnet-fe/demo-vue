import request from '@/utils/request'

// 广告组
export function advGroupList(query) {
  return request({
    url: '/advgroup/list',
    method: 'get',
    params: query
  })
}

export function addAdvGroup(data) {
  return request({
    url: '/advgroup/addGroup',
    method: 'post',
    data
  })
}

export function updateAdvGroup(data) {
  return request({
    url: '/advgroup/editGroup',
    method: 'post',
    data
  })
}

export function destroyAdvGroup(groupCode) {
  return request({
    url: '/advgroup/delGroup',
    method: 'post',
    data: { groupCode }
  })
}

// 广告组详情接口
export function searchGroup(params) {
  return request({
    url: '/advgroup/searchGroup',
    method: 'get',
    params
  })
}

// 广告组集合接口，无分页
export function groupCodeList() {
  return request({
    url: '/advgroup/getGroupCodeList',
    method: 'get'
  })
}

// 广告组类型select
export function groupTypeMapping() {
  return request({
    url: '/advgroup/getGroupTypeMapping',
    method: 'get'
  })
}

// 广告列表
export function advList(query) {
  return request({
    url: '/normaladv/list',
    method: 'get',
    params: query
  })
}

// 修改广告状态
export function advStatusSwitch(data) {
  return request({
    url: '/normaladv/statusSwitch',
    method: 'post',
    data
  })
}

// 广告状态select
export function advStatusMapping(query) {
  return request({
    url: '/normaladv/getAdvStatusMapping',
    method: 'get',
    params: query
  })
}

export function addAdvList(data) {
  return request({
    url: '/normaladv/addAdv',
    method: 'post',
    data
  })
}

export function updateAdvList(data) {
  return request({
    url: '/normaladv/editAdv',
    method: 'post',
    data
  })
}

export function destroyAdvList(advCode) {
  return request({
    url: '/normaladv/delAdv',
    method: 'post',
    data: { advCode }
  })
}

// 广告详情
export function searchAdv(params) {
  return request({
    url: '/normaladv/searchAdv',
    method: 'get',
    params
  })
}

// 轮播
export function slideshowList(params) {
  return request({
    url: '/admin/slideshow/list',
    method: 'get',
    params
  })
}

export function addSlideshow(data) {
  return request({
    url: '/admin/slideshow/add',
    method: 'post',
    data
  })
}

export function updateSlideshow(data) {
  return request({
    url: '/admin/slideshow/edit',
    method: 'post',
    data
  })
}

export function destroySlideshow(data) {
  return request({
    url: '/admin/slideshow/del',
    method: 'post',
    data
  })
}

// 轮播详情
export function searchSlideshow(params) {
  return request({
    url: '/admin/slideshow/search',
    method: 'get',
    params
  })
}

// 修改轮播状态
export function updateSlideshowStatus(data) {
  return request({
    url: '/admin/slideshow/statusSwitch',
    method: 'post',
    data
  })
}

// 打开方式集合
export function targetMapping(params) {
  return request({
    url: '/admin/slideshow/targetMapping',
    method: 'get',
    params
  })
}

// 所属分类集合
export function parentIdMapping(params) {
  return request({
    url: '/admin/slideshow/parentIdMapping',
    method: 'get',
    params
  })
}

// 轮播状态集合
export function statusMapping(params) {
  return request({
    url: '/admin/slideshow/statusMapping',
    method: 'get',
    params
  })
}

// 导航
export function navList(query) {
  return request({
    url: '/admin/navigation/list',
    method: 'get',
    params: query
  })
}

export function addNav(data) {
  return request({
    url: '/admin/navigation/add',
    method: 'post',
    data
  })
}

export function updateNav(data) {
  return request({
    url: '/admin/navigation/edit',
    method: 'post',
    data
  })
}

export function destroyNav(data) {
  return request({
    url: '/admin/navigation/del',
    method: 'post',
    data
  })
}

// 详情
export function searchNav(params) {
  return request({
    url: '/admin/navigation/search',
    method: 'get',
    params
  })
}

// 打开方式集合
export function navTargetMapping(params) {
  return request({
    url: '/admin/navigation/targetMapping',
    method: 'get',
    params
  })
}

// 所属分类集合
export function navParentIdMapping(params) {
  return request({
    url: '/admin/navigation/parentIdMapping',
    method: 'get',
    params
  })
}

// 更改状态
export function navStatusSwitch(data) {
  return request({
    url: '/admin/navigation/statusSwitch',
    method: 'post',
    data
  })
}
