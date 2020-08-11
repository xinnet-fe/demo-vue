import CustomUpload from './part'

/* istanbul ignore next */
CustomUpload.install = function(Vue) {
  Vue.component('custom-upload', CustomUpload)
}

export default CustomUpload
