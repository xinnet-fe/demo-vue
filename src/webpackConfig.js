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
      secure: false,
      changeOrigin: true
    },
    '/userManager': {
      target: 'https://agentmanagement.xinnet.com',
      secure: false,
      changeOrigin: true
    },
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
    '/accountDetail': {
      target: 'https://expense-boss.xinnet.com',
      secure: false,
      changeOrigin: true
    },
    '/recharge': {
      target: 'https://expense-boss.xinnet.com',
      secure: false,
      changeOrigin: true
    }
  },

  /**
   * babel config
   */

  babel: {
  }
}
