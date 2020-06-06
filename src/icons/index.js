import Vue from 'vue'
import SvgIcon from '@/components/demos/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

// 使用req导入目录中的文件(req.keys获取文件名)
// req.keys().map(req)

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
