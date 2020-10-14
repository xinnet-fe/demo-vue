'use strict'
/* 获取地址栏参数值 */
const QUERY_STRING = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = decodeURIComponent(window.location.search).substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return ''
}
export default {
  QUERY_STRING
}
