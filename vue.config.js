// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tally-vue/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icon');
    //icon 所在的目录
    config.module
      .rule('svg-sprite')
      //添加规则
      .test(/\.svg$/)
      //若匹配这个正则，就用上面的规则
      .include.add(dir).end()
      //限制范围 icons目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]}))
    //extract:false 不要解析为文件
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    //配置插件
    config.module.rule('svg').exclude.add(dir)
    //其他loader 不要管icons中的目录
  }
}

