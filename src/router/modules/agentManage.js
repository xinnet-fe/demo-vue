import Layout from '@/layout'

const agentManageRouter = {
  path: '/agent-manage',
  component: Layout,
  alwaysShow: true, // will always show the root menu
  redirect: 'noRedirect',
  name: 'AgentManage',
  meta: {
    title: '代理商管理',
    icon: 'user',
    roles: ['admin']
  },
  children: [
    {
      path: 'apply',
      component: () => import('@/views/agentManage/apply'),
      name: 'AgentApply',
      meta: {
        title: '代理申请',
        roles: ['admin']
      }
    },
    {
      path: 'info',
      component: () => import('@/views/agentManage/info'),
      name: 'AgentInfo',
      meta: {
        title: '代理商信息',
        roles: ['admin']
      }
    },
    {
      path: 'level',
      component: () => import('@/views/agentManage/level'),
      name: 'AgentLevel',
      meta: {
        title: '级别管理',
        roles: ['admin']
      }
    },
    {
      path: 'client',
      component: () => import('@/views/agentManage/client'),
      name: 'AgentClient',
      meta: {
        title: '代理商客户管理',
        roles: ['admin']
      }
    }
  ]
}

export default agentManageRouter
