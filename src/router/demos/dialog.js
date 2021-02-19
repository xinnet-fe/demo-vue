import Layout from '@/layout'

const dialogRouter = {
  path: '/dialog',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'dialog',
  meta: {
    title: '弹框',
    type: 'demo',
    icon: 'link'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/demos/dialog/index'),
      name: 'base',
      meta: { title: '基础弹窗', type: 'demo' }
    },
    {
      path: 'form',
      component: () => import('@/views/demos/dialog/form'),
      name: 'form',
      meta: { title: '表单弹窗', type: 'demo' }
    },
    {
      path: 'table',
      component: () => import('@/views/demos/dialog/table'),
      name: 'table',
      meta: { title: '表格弹窗', type: 'demo' }
    },
    {
      path: 'tab',
      component: () => import('@/views/demos/dialog/tab'),
      name: 'tab',
      meta: { title: '页签弹窗', type: 'demo' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/demos/dialog/drag-dialog'),
      name: 'drag-dialog',
      meta: { title: '拖拽弹窗', type: 'demo' }
    }
  ]
}
export default dialogRouter
