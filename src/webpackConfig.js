module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {
    // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/admin/'
    publicPath: '/xcms/admin/'
  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  // chainWebpack(config) {

  // },
  // devServer proxy
  proxy: {
    '/api': {
      target: 'https://xcms.xinnet.com',
      secure: false,
      changeOrigin: true
    }
    // '/normaladv': {
    //   target: 'http://172.22.132.7:8083',
    //   changeOrigin: true
    // },
    // '/admin': {
    //   target: 'http://172.22.132.7:8024',
    //   changeOrigin: true
    // },
    // '/advgroup': {
    //   target: 'http://172.22.132.7:8083',
    //   changeOrigin: true
    // }
  },

  /**
   * babel config
   */

  babel: {
  }
}
