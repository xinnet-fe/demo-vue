module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/admin'
  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  // chainWebpack(config) {

  // },
  // devServer proxy
  proxy: {

  },

  /**
   * babel config
   */

  babel: {
  }
}
