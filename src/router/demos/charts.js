/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  type: 'demo',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/demos/charts/keyboard'),
      name: 'KeyboardChart',
      type: 'demo',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/demos/charts/line'),
      name: 'LineChart',
      type: 'demo',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/demos/charts/mix-chart'),
      name: 'MixChart',
      type: 'demo',
      meta: { title: 'Mix Chart', noCache: true }
    }
  ]
}

export default chartsRouter
