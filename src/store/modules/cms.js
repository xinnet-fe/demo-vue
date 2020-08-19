import {
  advertGroupList,
  addAdvertGroup,
  updateAdvertGroup,
  destroyAdvertGroup,
  advertList,
  addAdvertList,
  updateAdvertList,
  destroyAdvertList,
  carouselList,
  addCarousel,
  updateCarousel,
  destroyCarousel,
  navList,
  addNav,
  updateNav,
  destroyNav
} from '@/api/cms'
// import reduce from 'lodash/reduce'
// import * as apis from '@/api/cms'

const state = {}

const mutations = {}

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

const actions = {
  advertGroupList(_, query) {
    return advertGroupList(query)
  },
  addAdvertGroup(_, query) {
    return addAdvertGroup(query)
  },
  updateAdvertGroup(_, query) {
    return updateAdvertGroup(query)
  },
  destroyAdvertGroup(_, query) {
    return destroyAdvertGroup(query)
  },
  advertList(_, query) {
    return advertList(query)
  },
  addAdvertList(_, query) {
    return addAdvertList(query)
  },
  updateAdvertList(_, query) {
    return updateAdvertList(query)
  },
  destroyAdvertList(_, query) {
    return destroyAdvertList(query)
  },
  carouselList(_, query) {
    return carouselList(query)
  },
  addCarousel(_, query) {
    return addCarousel(query)
  },
  updateCarousel(_, query) {
    return updateCarousel(query)
  },
  destroyCarousel(_, query) {
    return destroyCarousel(query)
  },
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
