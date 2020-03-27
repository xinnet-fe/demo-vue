/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  type: 'demo',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      type: 'demo',
      meta: { title: 'Tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      type: 'demo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      type: 'demo',
      meta: { title: 'JSON Editor' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      type: 'demo',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      type: 'demo',
      meta: { title: 'Upload' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      type: 'demo',
      meta: { title: 'Dropzone' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      type: 'demo',
      meta: { title: 'Sticky' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/count-to'),
      name: 'CountToDemo',
      type: 'demo',
      meta: { title: 'Count To' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      type: 'demo',
      meta: { title: 'Component Mixin' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      type: 'demo',
      meta: { title: 'Back To Top' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      type: 'demo',
      meta: { title: 'Drag Dialog' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/drag-select'),
      name: 'DragSelectDemo',
      type: 'demo',
      meta: { title: 'Drag Select' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'DndListDemo',
      type: 'demo',
      meta: { title: 'Dnd List' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      type: 'demo',
      meta: { title: 'Drag Kanban' }
    }
  ]
}

export default componentsRouter
