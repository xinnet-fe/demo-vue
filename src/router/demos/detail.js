import Layout from '@/layout'

const detailRouter = {
  path: '/detail',
  component: Layout,
  name: 'Detail',
  meta: {
    title: '详情',
    type: 'demo',
    icon: 'table'
  },
  children: [
    {
      path: 'table',
      component: () => import('@/views/demos/detail/table'),
      name: 'table',
      meta: { title: '表格详情', type: 'demo' }
    }
  ]
}
export default detailRouter
