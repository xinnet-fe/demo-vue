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
      changeOrigin: true,
      secure: false
    },
    '/promotion': {
      target: 'https://agentmkmanage.xinnet.com',
      changeOrigin: true,
      secure: false
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
