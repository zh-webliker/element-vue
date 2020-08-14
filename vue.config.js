module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 基本路径
    publicPath: process.env.NODE_ENV==='production'?"/":'/',

    // 输出文件目录
    // outputDir: 'static',

    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // 生产环境是否生成 sourceMap 文件
    // productionSourceMap: true,

    // webpack-dev-server 相关配置
    // devServer: {
    //     // open: process.platform === 'darwin',
    //     // host: '0.0.0.0',
    //     port: 8095,
    //     // https: false,
    //     // hotOnly: false,
    //     proxy: {
    //       '/api': {
    //         target: '',
    //         changeOrigin: true,
    //         pathRewrite: {
    //           '^/api': ''
    //         }
    //       }
    //     },
    //     before: app => {}
    // },
};
