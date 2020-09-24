const webpackConfig = require('./webpackConfig.js')

module.exports = {
  title: '代理管理平台',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',

  // 消息框停留时间
  duration: 2000,

  // 是否显示layout
  showLayout: true,

  // 开发环境
  hasDevelopment: process.env.NODE_ENV === 'development',

  // 研发环境token，要每天登录测试环境从浏览器cookie中获取
  xbtoken: 'ynnb6S2pCSe0OtrDDvg',

  xbTokenKey: process.env.NODE_ENV === 'development' ? 'xbtoken' : 'xbtoken_id',

  logoutApi: process.env.VUE_APP_ENV === 'production' ? 'https://sso.xinnet.com/logout?service=http://boss.xinnet.com/' : 'http://sso.xinnet.com:8084/logout?service=http://boss.xinnet.com:8082/',

  // webpack配置，覆盖掉vue.config.js中初始值
  webpackConfig
}
