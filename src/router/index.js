import Vue from 'vue'
import Router from 'vue-router'
import { hasDevelopment } from '@/settings'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './demos/components'
import chartsRouter from './demos/charts'
import tableRouter from './demos/table'
import nestedRouter from './demos/nested'
import formRouter from './demos/form'
import orderRouter from './modules/order'

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
        meta: { title: 'buttons', icon: 'dashboard', type: 'demo' }
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', type: 'demo' }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', type: 'demo' }
      }
    ]
  },
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
        meta: { title: 'Guide', icon: 'guide', noCache: true, type: 'demo' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true, type: 'demo' }
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
    hidden: true
  },
  orderRouter,
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
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
        meta: { title: 'Icons', icon: 'icon', noCache: true, type: 'demo' }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  formRouter,
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
        meta: { title: 'Pagination', icon: 'icon', noCache: true, type: 'demo' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      type: 'demo',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/demos/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit', type: 'demo' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/demos/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list', type: 'demo' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/demos/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list', type: 'demo' }
      }
    ]
  },

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
        meta: { title: 'Tab', icon: 'tab', type: 'demo' }
      }
    ]
  },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     type: 'demo',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true, type: 'demo' }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true, type: 'demo' }
  //     },
  //     {
  //       path: '403',
  //       component: () => import('@/views/errorPage/403'),
  //       name: 'Page403',
  //       meta: { title: '403', noCache: true, type: 'demo' }
  //     },
  //     {
  //       path: '500',
  //       component: () => import('@/views/errorPage/500'),
  //       name: 'Page500',
  //       meta: { title: '500', noCache: true, type: 'demo' }
  //     }
  //   ]
  // },

  {
    path: '/error-log',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'log',
        component: () => import('@/views/demos/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug', type: 'demo' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      type: 'demo',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/demos/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel', type: 'demo' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/demos/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected', type: 'demo' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/demos/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header', type: 'demo' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/demos/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel', type: 'demo' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip', type: 'demo' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/demos/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip', type: 'demo' }
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
    path: '/pdf/download',
    component: () => import('@/views/demos/pdf/download'),
    meta: {
      type: 'demo'
    },
    hidden: true
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
        meta: { title: 'Theme', icon: 'theme', type: 'demo' }
      }
    ]
  },

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
        meta: { title: 'Clipboard', icon: 'clipboard', type: 'demo' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    meta: {
      type: 'demo'
    },
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link', type: 'demo' }
      }
    ]
  }
] : []

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
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
    path: '/data',
    component: Layout,
    children: [
      {
        path: 'chart',
        component: () => import('@/views/data-chart/index'),
        name: 'DataChart',
        meta: { title: '数据监控', icon: 'home', affix: true }
      }
    ]
  },
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
    path: '/boss-nav-cmsmanage-neaws',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/boss-nav-cmsmanage-neaws/index')
      }
    ]
  },
  {
    path: '/boss-nav-usermanagedetail/:id(\\d+)',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/boss-nav-usermanagedetail/index')
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
