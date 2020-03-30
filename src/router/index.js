import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './demos/components'
import chartsRouter from './demos/charts'
import tableRouter from './demos/table'
import nestedRouter from './demos/nested'

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
  }
 */

const hasDevelopment = process.env.NODE_ENV === 'development'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const demosConstantRoutes = hasDevelopment ? [
  {
    path: '/dashboard',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/demos/dashboard/index'),
        name: 'Dashboard',
        type: 'demo',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/documentation/index'),
        name: 'Documentation',
        type: 'demo',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    type: 'demo',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/guide/index'),
        name: 'Guide',
        type: 'demo',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/profile/index'),
        name: 'Profile',
        type: 'demo',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
] : []

export const constantRoutes = [
  ...demosConstantRoutes,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    type: 'demo',
    children: [
      {
        path: '/redirect/:path(.*)',
        type: 'demo',
        component: () => import('@/views/demos/redirect/index')
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
    type: 'demo',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/demos/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/demos/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
const demosAsyncRoutes = hasDevelopment ? [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    type: 'demo',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/demos/permission/page'),
        name: 'PagePermission',
        type: 'demo',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/demos/permission/directive'),
        name: 'DirectivePermission',
        type: 'demo',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/demos/permission/role'),
        name: 'RolePermission',
        type: 'demo',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/icons/index'),
        name: 'Icons',
        type: 'demo',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    type: 'demo',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/demos/example/create'),
        name: 'CreateArticle',
        type: 'demo',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/demos/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        type: 'demo',
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/demos/example/list'),
        name: 'ArticleList',
        type: 'demo',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/tab/index'),
        name: 'Tab',
        type: 'demo',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    type: 'demo',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/demos/error-page/401'),
        name: 'Page401',
        type: 'demo',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/demos/error-page/404'),
        name: 'Page404',
        type: 'demo',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'log',
        component: () => import('@/views/demos/error-log/index'),
        name: 'ErrorLog',
        type: 'demo',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    type: 'demo',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/demos/excel/export-excel'),
        name: 'ExportExcel',
        type: 'demo',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/demos/excel/select-excel'),
        name: 'SelectExcel',
        type: 'demo',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/demos/excel/merge-header'),
        name: 'MergeHeader',
        type: 'demo',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/demos/excel/upload-excel'),
        name: 'UploadExcel',
        type: 'demo',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    type: 'demo',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/demos/zip/index'),
        name: 'ExportZip',
        type: 'demo',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/pdf/index'),
        name: 'PDF',
        type: 'demo',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/demos/pdf/download'),
    type: 'demo',
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/theme/index'),
        name: 'Theme',
        type: 'demo',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demos/clipboard/index'),
        name: 'ClipboardDemo',
        type: 'demo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    type: 'demo',
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        type: 'demo',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
] : []

export const asyncRoutes = [
  ...demosAsyncRoutes,
  {
    path: '/el',
    component: Layout,
    // redirect: '/el/form',
    alwaysShow: true, // will always show the root menu
    name: 'El',
    meta: {
      title: 'El',
      icon: 'user',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'form',
        component: () => import('@/views/el/index'),
        name: 'ElFormDemo',
        meta: {
          title: 'El Form',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'table',
        component: () => import('@/views/el/table'),
        name: 'ElTableDemo',
        meta: {
          title: 'El Table',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
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
