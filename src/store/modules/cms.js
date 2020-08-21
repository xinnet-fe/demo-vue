import {
  advGroupList,
  addAdvGroup,
  updateAdvGroup,
  destroyAdvGroup,
  advList,
  addAdvList,
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
  statusMapping
} from '@/api/cms'

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
  // 轮播-开发方式
  openMode: [],
  // 轮播-轮播分类
  slideshowType: [],
  // 轮播-轮播状态
  slideshowStatus: []
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
    console.log(list)
    state.openMode = list
  },
  PARENT_ID_MAPPING: (state, res) => {
    const { list } = res.data
    console.log(list)
    state.slideshowType = list
  },
  STATUS_MAPPING: (state, res) => {
    const { list } = res.data
    console.log(list)
    state.slideshowStatus = list
  }
}

function processData(res) {
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

const actions = {
  // 广告组
  advGroupList(_, query) {
    return advGroupList(query).then(processData)
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
    return advList(query).then(processData)
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
    return slideshowList(query)
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
    return targetMapping(query).then(res => commit('TARGET_MAPPING', res))
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
    return navList(query)
  },
  addNav(_, query) {
    return addNav(query)
  },
  updateNav(_, query) {
    return updateNav(query)
  },
  destroyNav(_, query) {
    return destroyNav(query)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// function generateActions() {
//   return reduce(apis, (res, api) => {
//     console.log(api)
//     const funcName = api.name
//     res[funcName] = (_, payload) => {
//       return api(payload)
//     }
//     return res
//   }, {})
// }
// const actions = generateActions()
