const webpackConfig = require('./src/settings.js').webpackConfig
const customConfig = webpackConfig.babelConfig

const defaultConfig = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      { modules: false }
    ]
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}

module.exports = {
  ...defaultConfig,
  ...customConfig
}
