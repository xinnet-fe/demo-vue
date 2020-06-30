'use strict'
const path = require('path')
const webpack = require('webpack')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '新网运营平台管理中心' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://console.xinnet.com',
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '' },
    //   }
    // },
    disableHostCheck: true,
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'index']
    },
    register: {
      // page 的入口
      entry: 'src/register.js',
      // 模板来源
      template: 'public/register.html',
      // 在 dist/index.html 的输出
      filename: 'register.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'register']
    },
    repassword: {
      // page 的入口
      entry: 'src/repassword.js',
      // 模板来源
      template: 'public/repassword.html',
      // 在 dist/index.html 的输出
      filename: 'repassword.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'repassword']
    },
    inviteReg: {
      // page 的入口
      entry: 'src/inviteReg.js',
      // 模板来源
      template: 'public/inviteReg.html',
      // 在 dist/index.html 的输出
      filename: 'inviteReg.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'inviteReg']
    },
    invite: {
      // page 的入口
      entry: 'src/invite.js',
      // 模板来源
      template: 'public/invite.html',
      // 在 dist/index.html 的输出
      filename: 'invite.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-libs', 'chunk-commons', 'chunk-elementUI', 'invite']
    }
  },
  chainWebpack(config) {
    // config.plugins.delete('preload-register') // TODO: need test
    // config.plugins.delete('prefetch-register') // TODO: need test
    // config.plugins.delete('preload-invite') // TODO: need test
    // config.plugins.delete('prefetch-invite') // TODO: need test
    // config.plugins.delete('preload-inviteReg') // TODO: need test
    // config.plugins.delete('prefetch-inviteReg') // TODO: need test
    // config.plugins.delete('preload-repassword') // TODO: need test
    // config.plugins.delete('prefetch-repassword') // TODO: need test
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
          // config
          //   .plugin('ScriptExtHtmlWebpackPlugin')
          //   .after('html')
          //   .use('script-ext-html-webpack-plugin', [{
          //   // `runtime` must same as runtimeChunk name. default is `runtime`
          //     inline: /runtime\..*\.js$/
          //   }])
          //   .end()
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
                  minChunks: 5, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // config.optimization.runtimeChunk('single')
        }
      )
  }
}
