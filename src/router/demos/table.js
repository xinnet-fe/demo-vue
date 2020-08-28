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
      meta: { title: 'Dynamic Table', type: 'demo' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/demos/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table', type: 'demo' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/demos/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit', type: 'demo' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/demos/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table', type: 'demo' }
    }
  ]
}
export default tableRouter
