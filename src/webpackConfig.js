module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {

  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  // chainWebpack(config) {

  // },
  // devServer proxy
  proxy: {
    '/bill': {
      target: 'https://tradeBoss.xinnet.com',
      secure: false,
      changeOrigin: true
    },
    '/product': {
      target: 'https://tradeBoss.xinnet.com',
      secure: false,
      changeOrigin: true
    },
    '/api': {
      target: 'https://tradeBoss.xinnet.com',
      changeOrigin: true
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
