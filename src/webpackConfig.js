module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/'
  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  // chainWebpack(config) {

  // },
  // devServer proxy
  proxy: {
    '/portal': {
      target: 'https://boss.xinnet.com',
      changeOrigin: true
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
