import Vue from 'vue'
import Router from 'vue-router'
import { hasDevelopment } from '@/settings'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './demos/components'
import tableRouter from './demos/table'
import nestedRouter from './demos/nested'
import formRouter from './demos/form'
import orderRouter from './demos/order'
import dialogRouter from './demos/dialog'
import boxRouter from './demos/box'
import listRouter from './demos/list'
import detailRouter from './demos/detail'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    type: ''                     if set 'demo', no packaging
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const demosConstantRoutes = hasDevelopment ? [
  {
    path: '/icon',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true, type: 'demo' }
      }
    ]
  },
  {
    path: '/buttons',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/buttons/index'),
        name: 'buttons',
        meta: { title: '按钮', icon: 'star', type: 'demo' }
      }
    ]
  },
  formRouter,
  tableRouter,
  {
    path: '/pagination',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/pagination/index'),
        name: 'Pagination',
        meta: { title: '分页', icon: 'education', noCache: true, type: 'demo' }
      }
    ]
  },
  orderRouter,
  {
    path: '/tab',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/tab/index'),
        name: 'Tab',
        meta: { title: '页签', icon: 'tab', type: 'demo' }
      }
    ]
  },
  boxRouter,
  listRouter,
  dialogRouter,
  detailRouter,
  {
    path: '/guide',
    component: Layout,
    meta: {
      type: 'demo'
    },
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/guide/index'),
        name: 'Guide',
        meta: { title: '引导', icon: 'guide', noCache: true, type: 'demo' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/demos/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/demos/login/auth-redirect'),
    hidden: false
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限',
      icon: 'lock',
      type: 'demo',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/demos/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'], // or you can only set roles in sub nav
          type: 'demo'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/demos/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission',
          type: 'demo'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/demos/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          type: 'demo',
          roles: ['admin']
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  {
    path: '/clipboard',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: '复制黏贴', icon: 'clipboard', type: 'demo' }
      }
    ]
  },
  nestedRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '错误页面',
      type: 'demo',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true, type: 'demo' }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true, type: 'demo' }
      },
      {
        path: '403',
        component: () => import('@/views/errorPage/403'),
        name: 'Page403',
        meta: { title: '403', noCache: true, type: 'demo' }
      },
      {
        path: '500',
        component: () => import('@/views/errorPage/500'),
        name: 'Page500',
        meta: { title: '500', noCache: true, type: 'demo' }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf', type: 'demo' }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/theme/index'),
        name: 'Theme',
        meta: { title: '主题切换', icon: 'theme', type: 'demo' }
      }
    ]
  }
] : []

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/agent-client-app/operation-system/see-through', // '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('@/views/index'),
        name: 'Home',
        hidden: true,
        meta: { title: 'Home', icon: 'home', affix: true }
      }
    ]
  },
  ...demosConstantRoutes,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/errorPage/404')
      }
    ]
  },
  {
    path: '/403',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/errorPage/403')
      }
    ]
  },
  {
    path: '/500',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/errorPage/500'),
        hidden: true
      }
    ]
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
