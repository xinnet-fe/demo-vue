/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    type: 'demo',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/demos/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true, type: 'demo' }
    },
    {
      path: 'line',
      component: () => import('@/views/demos/charts/line'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true, type: 'demo' }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/demos/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true, type: 'demo' }
    }
  ]
}

export default chartsRouter
