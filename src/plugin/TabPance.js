import TabPane from '@/components/TabPane'

TabPane.install = function(Vue) {
  Vue.component('el-tab-pane-ext', TabPane)
}

export default TabPane
