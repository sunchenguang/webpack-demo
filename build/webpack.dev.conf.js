/**
 * Created by suncg on 2018/11/20.
 */
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({
            usePostCSS: true,
            sourceMap: config.dev.cssSourceMap
        })
    },
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {
            warning: false,
            errors: true
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true,
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: resolve('favicon.ico'),
            title: 'webpack-demo',
            templateParameters: {
                BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
            }
        }),
        new webpack.DllReferencePlugin({
            // 描述 react 动态链接库的文件内容
            manifest: require('../dist/elementUI.manifest.json')
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dist/elementUI.dll.js'],
            append: false,
            publicPath: false
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            devWebpackConfig.devServer.port = port

            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
                        ]
                    },
                    onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
                })
            )
            resolve(devWebpackConfig)
        }
    })
})






