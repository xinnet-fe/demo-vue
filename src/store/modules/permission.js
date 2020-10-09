import filter from 'lodash/filter'
import { constantRoutes, asyncRoutes } from '@/router'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import isNull from 'lodash/isNull'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
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

export function filterIframeRoutes(routes, parentRes) {
  const res = parentRes || []
  forEach(routes, route => {
    if (route.meta && route.meta.url) {
      res.push(route)
    }
    if (route.children) {
      filterIframeRoutes(route.children, res)
    }
  })

  if (!parentRes) {
    return res
  }
}

const lazyLoadView = viewPath => resolve => require([`@/views/${viewPath}/index.vue`], resolve)

function hasNull(val) {
  return isNull(val) || val === ''
}

function getAsyncRoutesByMenus(menus, parentViewPath) {
  const routes = []
  forEach(menus, (o, i) => {
    const name = o.code
    const icon = !hasNull(o.icon) ? o.icon : ''
    const isParent = hasNull(o.parentCode)
    const isUrl = !hasNull(o.url)

    // url有值是外链，url无值是路由
    // target：tab项目内t打开，target：blank新开页面
    // url、target同步返回数据
    const isTarget = !hasNull(o.target) && o.target === 'tab'
    const path = isUrl && !isTarget ? o.url : isParent ? `/${name}` : name
    // const viewPath = isParent ? o.code : `${parentViewPath}/${o.code}`
    const viewPath = o.code

    const route = {
      path: `${path}${o.param ? o.param : ''}`,
      name: upperFirst(camelCase(name)),
      meta: {
        title: o.text
      },
      hidden: o.hidden ? o.hidden : false
    }

    // 非外链且无子路由
    if (!isParent && !isUrl && !o.children) {
      route.component = lazyLoadView(viewPath)
    // 设置空组件
    } else if (!isParent && !isUrl) {
      route.component = {
        render: h => h('router-view')
      }
    }

    // 外链网站内打开target=tab;
    if (isUrl && isTarget) {
      route.meta.url = o.url
    }

    // 根路由
    if (isParent) {
      route.redirect = 'noRedirect'
      route.meta.icon = icon
      route.component = Layout
    // 根路由或非根路由并且有子路由的非站外url
    } else if ((o.children && !isUrl) || (o.children && isUrl && isTarget)) {
      route.redirect = 'noRedirect'
    }

    // 根路由无子节点
    if (isParent && !o.children && !isUrl) {
      const title = route.meta.title
      route.children = [
        {
          path: `index${o.param ? o.param : ''}`,
          name: `${o.code}-index`,
          component: lazyLoadView(o.code),
          meta: { title }
        }
      ]
    }

    // 有子路由
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
