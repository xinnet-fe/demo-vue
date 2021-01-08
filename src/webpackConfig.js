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
    '/marketing': {
      target: 'https://agentmkmanage.xinnet.com',
      changeOrigin: true
    },
    '/promotion': {
      target: 'https://agentmkmanage.xinnet.com',
      changeOrigin: true
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
