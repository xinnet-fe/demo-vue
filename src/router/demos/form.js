/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Form',
    type: 'demo',
    icon: 'chart'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/demos/form/index'),
      name: 'base',
      meta: { title: 'base', noCache: true, type: 'demo' }
    },
    {
      path: 'inline',
      component: () => import('@/views/demos/form/inline'),
      name: 'inline',
      meta: { title: 'inline', noCache: true, type: 'demo' }
    }
  ]
}

export default formRouter
