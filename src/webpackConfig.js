const path = require('path')
const pages = ['index', 'register', 'repassword', 'inviteReg', 'invite']
const pagesObj = {}
pages.map((v) => {
  pagesObj[v] = {
    entry: (v === 'index' ? 'src/main.js' : `src/${v}.js`),
    template: `public/${v}.html`,
    filename: `${v}.html`,
    chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', v]
  }
})
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {
    pages: pagesObj
  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  chainWebpack(config) {
    pages.map((v) => {
      config.plugins.delete(`preload-${v}`)
      config.plugins.delete(`prefetch-${v}`)
    })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // config.optimization.runtimeChunk('single')
        }
      )
  },
  // devServer proxy
  proxy: {

  },

  /**
   * babel config
   */

  babel: {}
}
