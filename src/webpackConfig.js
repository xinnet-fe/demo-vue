module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/admin/'
  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  // chainWebpack(config) {

  // },
  // devServer proxy
  proxy: {
    '/advgroup': {
      target: 'http://172.22.132.7:8083',
      changeOrigin: true
    },
    '/normaladv': {
      target: 'http://172.22.132.7:8083',
      changeOrigin: true
    },
    '/admin': {
      target: 'http://172.22.132.7:8024',
      changeOrigin: true
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
