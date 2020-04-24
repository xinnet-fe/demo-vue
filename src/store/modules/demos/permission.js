import filter from 'lodash/filter'
import { constantRoutes, asyncRoutes } from '@/router'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import isNull from 'lodash/isNull'
import camelCase from 'lodash/camelCase'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function filterDemoRoutes(routes) {
  return filter(routes, route => (route.meta && route.meta.type === 'demo'))
}

export function filterMainRoutes(routes) {
  return reduce(routes, (res, route) => {
    if (route.meta && route.meta.type === 'demo') {
      return res
    }
    res.push(route)
    return res
  }, [])
}

const lazyLoadView = viewPath => resolve => require([`@/views/${viewPath}/index.vue`], resolve)

function getAsyncRoutesByMenus(menus, parentViewPath) {
  const routes = []
  forEach(menus, (o, i) => {
    const name = o.code
    const icon = !isNull(o.icon) ? o.icon : o.code
    const isParent = isNull(o.parentCode)
    const isUrl = !isNull(o.url)

    // url有值是外链，url无值是路由
    // target：tab项目内t打开，target：blank新开页面
    // url、target同步返回数据
    const isTarget = !isNull(o.target) && o.target === 'tab'
    const path = isUrl ? o.url : isParent ? `/${name}` : name
    const viewPath = isParent ? o.code : `${parentViewPath}/${o.code}`
    const component = isParent ? Layout : lazyLoadView(viewPath)

    const route = {
      path,
      meta: {
        title: o.text
      }
    }

    // 非外链
    if (!isUrl) {
      route.name = camelCase(name)
      route.component = component
    }

    // 外链网站内打开
    if (isUrl && isTarget) {
      route.name = camelCase(name)
      route.path = isParent ? `/${name}` : name
      route.component = lazyLoadView('staticPage')
      route.meta.url = o.url
    }

    if (isParent) {
      route.redirect = 'noRedirect'
      route.meta.icon = icon
    }

    if (o.children) {
      route.alwaysShow = true
      route.children = getAsyncRoutesByMenus(o.children, viewPath)
    }
    routes.push(route)
  })
  return routes
}

const state = {
  routes: [],
  addRoutes: [],
  demoRoutes: [],
  mainRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
    state.demoRoutes = filterDemoRoutes(state.routes)
    state.mainRoutes = filterMainRoutes(state.routes)
  },
  SET_MAIN_ROUTES: (state, routes) => {
    state.addRoutes = state.addRoutes.concat(routes)
    state.routes = constantRoutes.concat(routes)
    state.demoRoutes = filterDemoRoutes(state.routes)
    state.mainRoutes = filterMainRoutes(state.routes)
  },
  REMOVE_PERMISSION: (state) => {
    state.addRoutes = []
    state.routes = []
    state.demoRoutes = []
    state.mainRoutes = []
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = []
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateMainRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const routes = getAsyncRoutesByMenus(menus).concat(asyncRoutes)

      commit('SET_MAIN_ROUTES', routes)
      console.log(routes)
      resolve(routes)
    })
  },
  removePermission({ commit }) {
    commit('REMOVE_PERMISSION')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
