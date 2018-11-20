/**
 * Created by suncg on 2018/11/20.
 */
const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        host: 'localhost',
        port: 9527,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: false,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'cheap-source-map',
        cssSourceMap: false
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        devtool: 'source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report || false,
        generateAnalyzerReport: process.env.npm_config_generate_report || false
    }
}


