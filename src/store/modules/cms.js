import {
  advGroupList,
  addAdvGroup,
  updateAdvGroup,
  destroyAdvGroup,
  advList,
  addAdvList,
  advStatusSwitch,
  updateAdvList,
  destroyAdvList,
  slideshowList,
  addSlideshow,
  updateSlideshow,
  destroySlideshow,
  searchSlideshow,
  updateSlideshowStatus,
  targetMapping,
  parentIdMapping,
  navList,
  addNav,
  updateNav,
  destroyNav,
  groupTypeMapping,
  advStatusMapping,
  groupCodeList,
  searchGroup,
  searchAdv,
  statusMapping,
  searchNav,
  navTargetMapping,
  navParentIdMapping,
  navStatusSwitch
} from '@/api/cms'
import map from 'lodash/map'

const emptyData = {
  list: [],
  page: {}
}

const state = {
  // 广告组-广告站点
  groupTypes: [],
  // 广告-所属广告组
  groupList: [],
  // 广告-广告状态
  advStatus: [],
  // 轮播-打开方式
  openMode: [],
  // 轮播-轮播分类
  slideshowType: [],
  // 轮播-轮播状态
  slideshowStatus: [],
  // 导航-打开方式
  navOpenMode: [],
  // 导航-分类
  navType: []
}

const mutations = {
  GROUP_TYPES: (state, res) => {
    const { list } = res.data
    state.groupTypes = list
  },
  GROUP_LIST: (state, res) => {
    const { list } = res.data
    state.groupList = list
  },
  ADV_STATUS: (state, res) => {
    const { list } = res.data
    state.advStatus = list
  },
  TARGET_MAPPING: (state, res) => {
    const { list } = res.data
    state.openMode = list
  },
  PARENT_ID_MAPPING: (state, res) => {
    const { list } = res.data
    const result = deepProcessCollectionData(list)
    state.slideshowType = result
  },
  STATUS_MAPPING: (state, res) => {
    const { list } = res.data
    state.slideshowStatus = list
  },
  NAV_TARGET_MAPPING: (state, res) => {
    const { list } = res.data
    state.navOpenMode = list
  },
  NAV_PARENT_ID_MAPPING: (state, res) => {
    const { list } = res.data
    const result = deepProcessCollectionData(list)
    state.navType = result
  }
}

// 处理列表page数据结构
function processListData(res) {
  const { data } = res
  if (data && data.page) {
    const { list, ...restPage } = data.page
    const result = {
      list,
      page: {
        pageNum: data.pageNum,
        ...restPage
      }
    }
    return result
  }
  return emptyData
}

// 递归处理列表数据
function deepProcessListData(data) {
  return map(data, o => {
    if (o.childList) {
      o.children = deepProcessListData(o.childList)
    }
    return o
  })
}

// 递归处理集合数据
function deepProcessCollectionData(data) {
  return map(data, o => {
    o.label = o.name
    o.value = o.id
    if (o.childList) {
      o.children = deepProcessCollectionData(o.childList)
    }
    return o
  })
}

const actions = {
  // 广告组
  advGroupList(_, query) {
    return advGroupList(query).then(processListData)
  },
  addAdvGroup(_, query) {
    return addAdvGroup(query)
  },
  updateAdvGroup(_, query) {
    return updateAdvGroup(query)
  },
  destroyAdvGroup(_, query) {
    return destroyAdvGroup(query)
  },
  // 广告组详情接口
  searchGroup(_, query) {
    return searchGroup(query)
  },
  // 广告组集合接口，无分页
  groupCodeList({ commit }, query) {
    return groupCodeList(query).then(res => commit('GROUP_LIST', res))
  },
  // 广告组类型select
  groupTypeMapping({ commit }, query) {
    return groupTypeMapping(query).then(res => commit('GROUP_TYPES', res))
  },
  // 广告列表
  advList(_, query) {
    return advList(query).then(processListData)
  },
  // 修改广告状态
  advStatusSwitch(_, data) {
    return advStatusSwitch(data)
  },
  // 广告状告状态select
  advStatusMapping({ commit }, query) {
    return advStatusMapping(query).then(res => commit('ADV_STATUS', res))
  },
  addAdvList(_, query) {
    return addAdvList(query)
  },
  updateAdvList(_, query) {
    return updateAdvList(query)
  },
  destroyAdvList(_, query) {
    return destroyAdvList(query)
  },
  // 广告详情
  searchAdv(_, query) {
    return searchAdv(query)
  },
  // 轮播
  slideshowList(_, query) {
    return slideshowList(query).then(res => {
      const { data } = res
      if (data && data.listTree) {
        return deepProcessListData(data.listTree)
      }
      return []
    })
  },
  addSlideshow(_, query) {
    return addSlideshow(query)
  },
  updateSlideshow(_, query) {
    return updateSlideshow(query)
  },
  destroySlideshow(_, query) {
    return destroySlideshow(query)
  },
  // 轮播详情
  searchSlideshow(_, query) {
    return searchSlideshow(query)
  },
  // 修改轮播状态
  updateSlideshowStatus(_, query) {
    return updateSlideshowStatus(query)
  },
  // 打开方式集合
  targetMapping({ commit }, query) {
    return targetMapping(query).then(res => {
      commit('TARGET_MAPPING', res)
      return res
    })
  },
  // 所属分类集合
  parentIdMapping({ commit }, query) {
    return parentIdMapping(query).then(res => commit('PARENT_ID_MAPPING', res))
  },
  statusMapping({ commit }, query) {
    return statusMapping(query).then(res => commit('STATUS_MAPPING', res))
  },
  // 导航
  navList(_, query) {
    return navList(query).then(res => {
      const { data } = res
      if (data && data.listTree) {
        return deepProcessListData(data.listTree)
      }
      return []
    })
  },
  addNav(_, query) {
    return addNav(query)
  },
  updateNav(_, query) {
    return updateNav(query)
  },
  destroyNav(_, query) {
    return destroyNav(query)
  },
  searchNav(_, query) {
    return searchNav(query)
  },
  navTargetMapping({ commit }, query) {
    return navTargetMapping(query).then(res => {
      commit('NAV_TARGET_MAPPING', res)
      return res
    })
  },
  navParentIdMapping({ commit }, query) {
    return navParentIdMapping(query).then(res => commit('NAV_PARENT_ID_MAPPING', res))
  },
  navStatusSwitch(_, query) {
    return navStatusSwitch(query)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
