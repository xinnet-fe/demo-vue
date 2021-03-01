import Layout from '@/layout'

const boxRouter = {
  path: '/box',
  component: Layout,
  name: 'BoxTable',
  meta: {
    title: '盒子容器',
    type: 'demo',
    icon: 'table'
  },
  children: [
    {
      path: 'box1',
      component: () => import('@/views/demos/box/box1'),
      name: 'box1',
      meta: { title: '盒子1', type: 'demo' }
    },
    {
      path: 'box2',
      component: () => import('@/views/demos/box/box2'),
      name: 'box2',
      meta: { title: '盒子2', type: 'demo' }
    },
    {
      path: 'box3',
      component: () => import('@/views/demos/box/box3'),
      name: 'box3',
      meta: { title: '盒子3', type: 'demo' }
    }
  ]
}
export default boxRouter
