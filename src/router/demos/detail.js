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
      path: 'detail_table',
      component: () => import('@/views/demos/detail/table'),
      name: 'detail_table',
      meta: { title: '表格详情', type: 'demo' }
    },
    {
      path: 'detail_back',
      component: () => import('@/views/demos/detail/detail2'),
      name: 'detail_back',
      meta: { title: '详情返回', type: 'demo' }
    }
  ]
}
export default detailRouter
