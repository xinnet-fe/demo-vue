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

// 站点类型集合
export function navSiteMapping(params) {
  return request({
    url: '/admin/navigation/siteMapping',
    method: 'get',
    params
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

// 豆腐块
export function beancurdCubeList(query) {
  return request({
    url: '/admin/widget/list',
    method: 'get',
    params: query
  })
}

export function addBeancurdCube(data) {
  return request({
    url: '/admin/widget/add',
    method: 'post',
    data
  })
}

export function updateBeancurdCube(data) {
  return request({
    url: '/admin/widget/edit',
    method: 'post',
    data
  })
}

export function destroyBeancurdCube(id) {
  return request({
    url: `/admin/widget/del?id=${id}`,
    method: 'post'
  })
}

export function widgetStatusSwitch(id) {
  return request({
    url: `/admin/widget/statusSwitch?id=${id}`,
    method: 'post'
  })
}

export function searchBeancurdCube(params) {
  return request({
    url: '/admin/widget/search',
    method: 'get',
    params
  })
}

export function widgetParentIdMapping(params) {
  return request({
    url: '/admin/widget/parentIdMapping',
    method: 'get',
    params
  })
}

// 单页面
export function singlePageList(query) {
  return request({
    url: '/admin/page/list',
    method: 'get',
    params: query
  })
}

export function addSinglePage(data) {
  return request({
    url: '/admin/page/add',
    method: 'post',
    data
  })
}

export function updateSinglePage(data) {
  return request({
    url: '/admin/page/edit',
    method: 'post',
    data
  })
}

export function destroySinglePage(id) {
  return request({
    url: `/admin/page/del?id=${id}`,
    method: 'post'
  })
}

export function searchSinglePage(params) {
  return request({
    url: '/admin/page/search',
    method: 'get',
    params
  })
}

// 页面预发
export function mkHtml(id) {
  return request({
    url: `/admin/page/mkHtml?id=${id}`,
    method: 'post'
  })
}

// 页面预览
export function previewPage(id) {
  return request({
    url: `/admin/page/previewPage?id=${id}`,
    method: 'get'
  })
}

// 页面发布
export function publish(id) {
  return request({
    url: `/admin/page/publish?id=${id}`,
    method: 'post'
  })
}

export function searchTemplate(id) {
  return request({
    url: `/admin/page/searchTemplate?id=${id}`,
    method: 'post'
  })
}

export function editTemplate(data) {
  return request({
    url: '/admin/page/editTemplate',
    method: 'post',
    data
  })
}

export function singlePageTypeMapping(params) {
  return request({
    url: '/admin/page/typeMapping',
    method: 'get',
    params
  })
}

// 上传图片
export function uploadFile(data) {
  return request({
    url: '/admin/upload/img',
    method: 'post',
    data
  })
}

// 行政区域
export function listAreaByParentCode(params) {
  return request({
    url: '/admin/area/listAreaByParentCode',
    method: 'get',
    params
  })
}

// 行业分类
export function listIndustryCategory(params) {
  return request({
    url: '/admin/industryCategory/listIndustryCategory',
    method: 'get',
    params
  })
}

// 站点类型集合
export function singlePageSiteTypeMapping(params) {
  return request({
    url: '/admin/page/siteTypeMapping',
    method: 'get',
    params
  })
}

// 同步预发
export function syncPreRelease(data) {
  return request({
    url: '/admin/page/syncPreRelease',
    method: 'get',
    data
  })
}

// 同步线上
export function syncOnline(data) {
  return request({
    url: '/admin/page/syncOnline',
    method: 'get',
    data
  })
}

// 栏目
export function channelList(query) {
  return request({
    url: '/admin/channel/list',
    method: 'get',
    params: query
  })
}

export function searchChannel(params) {
  return request({
    url: '/admin/channel/search',
    method: 'get',
    params
  })
}

export function addChannel(data) {
  return request({
    url: '/admin/channel/add',
    method: 'post',
    data
  })
}

export function updateChannel(data) {
  return request({
    url: '/admin/channel/edit',
    method: 'post',
    data
  })
}

export function destroyChannel(data) {
  return request({
    url: '/admin/channel/del',
    method: 'post',
    data
  })
}

export function previewPcCoverPage(params) {
  return request({
    url: '/admin/channel/previewPcCoverPage',
    method: 'get',
    params
  })
}

export function previewPcListPage(params) {
  return request({
    url: '/admin/channel/previewPcListPage',
    method: 'get',
    params
  })
}

export function previewMCoverPage(params) {
  return request({
    url: '/admin/channel/previewMCoverPage',
    method: 'get',
    params
  })
}

export function previewMListPage(params) {
  return request({
    url: '/admin/channel/previewMListPage',
    method: 'get',
    params
  })
}

export function columnParentIdMapping(params) {
  return request({
    url: '/admin/channel/parentIdMapping',
    method: 'get',
    params
  })
}

// 内容
export function infoList(query) {
  return request({
    url: '/admin/info/list',
    method: 'get',
    params: query
  })
}

export function searchInfo(params) {
  return request({
    url: '/admin/info/search',
    method: 'get',
    params
  })
}

export function addInfo(data) {
  return request({
    url: '/admin/info/add',
    method: 'post',
    data
  })
}

export function updateInfo(data) {
  return request({
    url: '/admin/info/edit',
    method: 'post',
    data
  })
}

export function destroyInfo(data) {
  return request({
    url: '/admin/info/del',
    method: 'post',
    data
  })
}

export function destroyInfos(data) {
  return request({
    url: '/admin/info/dels',
    method: 'post',
    data
  })
}

export function authedInfo(data) {
  return request({
    url: '/admin/info/authed',
    method: 'post',
    data
  })
}

export function resetAuthedInfo(data) {
  return request({
    url: '/admin/info/resetAuthed',
    method: 'post',
    data
  })
}

export function resetAuthedInfos(data) {
  return request({
    url: '/admin/info/authed',
    method: 'post',
    data
  })
}

export function infoAuthedMapping(params) {
  return request({
    url: '/admin/info/authedMapping',
    method: 'get',
    params
  })
}

export function infoSensitiveMapping(params) {
  return request({
    url: '/admin/info/sensitiveMapping',
    method: 'get',
    params
  })
}

export function previewPcContentPage(params) {
  return request({
    url: '/admin/info/previewPcContentPage',
    method: 'get',
    params
  })
}

export function previewMContentPage(params) {
  return request({
    url: '/admin/info/previewMContentPage',
    method: 'get',
    params
  })
}
