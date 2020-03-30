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
      component: () => import('@/views/demos/components-demo/tinymce'),
      name: 'TinymceDemo',
      type: 'demo',
      meta: { title: 'Tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/demos/components-demo/markdown'),
      name: 'MarkdownDemo',
      type: 'demo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/demos/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      type: 'demo',
      meta: { title: 'JSON Editor' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/demos/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      type: 'demo',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/demos/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      type: 'demo',
      meta: { title: 'Upload' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/demos/components-demo/dropzone'),
      name: 'DropzoneDemo',
      type: 'demo',
      meta: { title: 'Dropzone' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/demos/components-demo/sticky'),
      name: 'StickyDemo',
      type: 'demo',
      meta: { title: 'Sticky' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/demos/components-demo/count-to'),
      name: 'CountToDemo',
      type: 'demo',
      meta: { title: 'Count To' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/demos/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      type: 'demo',
      meta: { title: 'Component Mixin' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/demos/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      type: 'demo',
      meta: { title: 'Back To Top' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/demos/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      type: 'demo',
      meta: { title: 'Drag Dialog' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/demos/components-demo/drag-select'),
      name: 'DragSelectDemo',
      type: 'demo',
      meta: { title: 'Drag Select' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/demos/components-demo/dnd-list'),
      name: 'DndListDemo',
      type: 'demo',
      meta: { title: 'Dnd List' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/demos/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      type: 'demo',
      meta: { title: 'Drag Kanban' }
    }
  ]
}

export default componentsRouter
