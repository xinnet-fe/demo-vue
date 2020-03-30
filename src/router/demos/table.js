/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  type: 'demo',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/demos/table/dynamic-table/index'),
      name: 'DynamicTable',
      type: 'demo',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/demos/table/drag-table'),
      name: 'DragTable',
      type: 'demo',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/demos/table/inline-edit-table'),
      name: 'InlineEditTable',
      type: 'demo',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/demos/table/complex-table'),
      name: 'ComplexTable',
      type: 'demo',
      meta: { title: 'Complex Table' }
    }
  ]
}
export default tableRouter
