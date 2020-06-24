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
    '/employee': {
      target: 'https://agentmanagement.xinnet.com',
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
