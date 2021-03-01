import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '表格',
    type: 'demo',
    icon: 'table'
  },
  children: [
    {
      path: 'base-table',
      component: () => import('@/views/demos/table/base-table'),
      name: 'baseTable',
      meta: { title: '基础表格', type: 'demo' }
    },
    {
      path: 'tree-table',
      component: () => import('@/views/demos/table/tree-table'),
      name: 'treeTable',
      meta: { title: '树形表格', type: 'demo' }
    },
    {
      path: 'dynamic-table',
      component: () => import('@/views/demos/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '动态表格', type: 'demo' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/demos/table/drag-table'),
      name: 'DragTable',
      meta: { title: '拖拽表格', type: 'demo' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/demos/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '行内编辑表格', type: 'demo' }
    }
  ]
}
export default tableRouter
