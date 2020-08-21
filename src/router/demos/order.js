import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  // redirect: '/order/form',
  alwaysShow: true, // will always show the root menu
  redirect: 'noRedirect',
  name: 'El',
  meta: {
    title: '订单',
    icon: 'user',
    type: 'demo',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'form',
      component: () => import('@/views/demos/order/base'),
      name: 'ElFormDemo',
      meta: {
        title: '订单查询',
        roles: ['admin', 'editor'], // or you can only set roles in sub nav
        type: 'demo'
      }
    }
  ]
}

export default orderRouter
