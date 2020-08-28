/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '表单',
    type: 'demo',
    icon: 'form'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/demos/form/index'),
      name: 'base',
      meta: { title: '竖向排列', noCache: true, type: 'demo' }
    },
    {
      path: 'inline',
      component: () => import('@/views/demos/form/inline'),
      name: 'inline',
      meta: { title: '横向排列', noCache: true, type: 'demo' }
    }
  ]
}

export default formRouter
