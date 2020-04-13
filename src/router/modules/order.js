import Layout from '@/layout'

const orderRouter = {
  path: '/el',
  component: Layout,
  // redirect: '/el/form',
  alwaysShow: true, // will always show the root menu
  redirect: 'noRedirect',
  name: 'El',
  meta: {
    title: '订单',
    icon: 'user'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'form',
      component: () => import('@/views/el/index'),
      name: 'ElFormDemo',
      meta: {
        title: '订单查询',
        roles: ['admin', 'editor'], // or you can only set roles in sub nav
        affix: true
      }
    },
    {
      path: 'table',
      component: () => import('@/views/el/table'),
      name: 'ElTableDemo',
      meta: {
        title: 'El Table',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
  ]
}

export default orderRouter
