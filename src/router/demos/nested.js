/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: 'Nested Routes',
    type: 'demo',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/demos/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu 1', type: 'demo' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/demos/nested/menu1/menu1-1'),
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1', type: 'demo' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/demos/nested/menu1/menu1-2'),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: 'Menu 1-2', type: 'demo' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/demos/nested/menu1/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1', type: 'demo' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/demos/nested/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2', type: 'demo' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('@/views/demos/nested/menu1/menu1-3'),
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3', type: 'demo' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/demos/nested/menu2/index'),
      meta: { title: 'Menu 2', type: 'demo' }
    }
  ]
}

export default nestedRouter
