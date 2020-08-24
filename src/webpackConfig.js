const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  /**
   * webpack config
   */

  // vue.config根级
  rootConfig: {
    pages: {
      index: {
        // page的入口
        entry: 'src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 在dist/index.html的输出
        filename: 'index.html',
        // 当使用title选项时，
        // template中的title标签需要是<title><%=htmlWebpackPlugin.options.title%></title>
        chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'index']
      },
      register: {
        // page的入口
        entry: 'src/register.js',
        // 模板来源
        template: 'public/register.html',
        // 在dist/index.html的输出
        filename: 'register.html',
        // 当使用title选项时，
        // template中的title标签需要是<title><%=htmlWebpackPlugin.options.title%></title>
        chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'register']
      },
      repassword: {
        // page的入口
        entry: 'src/repassword.js',
        // 模板来源
        template: 'public/repassword.html',
        // 在dist/index.html的输出
        filename: 'repassword.html',
        // 当使用title选项时，
        // template中的title标签需要是<title><%=htmlWebpackPlugin.options.title%></title>
        chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'repassword']
      },
      inviteReg: {
        // page的入口
        entry: 'src/inviteReg.js',
        // 模板来源
        template: 'public/inviteReg.html',
        // 在dist/index.html的输出
        filename: 'inviteReg.html',
        // 当使用title选项时，
        // template中的title标签需要是<title><%=htmlWebpackPlugin.options.title%></title>
        chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'inviteReg']
      },
      invite: {
        // page的入口
        entry: 'src/invite.js',
        // 模板来源
        template: 'public/invite.html',
        // 在dist/index.html的输出
        filename: 'invite.html',
        // 当使用title选项时，
        // template中的title标签需要是<title><%=htmlWebpackPlugin.options.title%></title>
        chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'invite']
      }
    }
  },
  // configureWebpack
  configureWebpack: {

  },
  // chainWebpack
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

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
