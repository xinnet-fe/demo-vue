/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '小工具',
    type: 'demo',
    icon: 'component'
  },
  children: [
    {
      path: 'markdown',
      component: () => import('@/views/demos/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown', type: 'demo' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/demos/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON Editor', type: 'demo' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/demos/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane', type: 'demo' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/demos/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone', type: 'demo' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/demos/components-demo/count-to'),
      name: 'CountToDemo',
      meta: { title: 'Count To', type: 'demo' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/demos/components-demo/drag-select'),
      name: 'DragSelectDemo',
      meta: { title: 'Drag Select', type: 'demo' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/demos/components-demo/dnd-list'),
      name: 'DndListDemo',
      meta: { title: 'Dnd List', type: 'demo' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/demos/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'Drag Kanban', type: 'demo' }
    }
  ]
}

export default componentsRouter
