import Layout from '@/layout'

const listRouter = {
  path: '/list',
  component: Layout,
  name: 'List',
  meta: {
    title: '列表',
    type: 'demo',
    icon: 'list'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/demos/list/list'),
      name: 'list',
      meta: { title: '列表', type: 'demo' }
    }
  ]
}
export default listRouter
