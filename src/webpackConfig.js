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
    '/portal': {
      target: 'http://119.10.116.247:8082',
      changeOrigin: true
    },
    '/userManager': {
      target: 'https://agentmanagement.xinnet.com',
      changeOrigin: true
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
