/**
 * Created by suncg on 2018/11/20.
 */
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
    const assetsSubDirectory =
        process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 构造多个css对象
 *
 * {
 *     css: []
 *
 *
 * }
 *
 *
 *
 *
 *
 * @param options {sourceMap, extract, usePostCSS} 支持3个参数
 */
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOption) {
        const loaders = []
        //是否使用extract
        if (options.extract) {
            loaders.push(MiniCssExtractPlugin.loader)
        } else {
            loaders.push('vue-style-loader')
        }
        //css-loader肯定要的嘛
        loaders.push(cssLoader)
        //是否使用usePostCSS
        if (options.usePostCSS) {
            loaders.push(postcssLoader)
        }
        //使用传入的loader
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOption, {
                    sourceMap: options.sourceMap
                })
            })
        }
        return loaders
    }

    return {
        //使用vue-style-loader, css-loader, postcss-loader
        css: generateLoaders(),
        postcss: generateLoaders(),
        //使用vue-style-loader, css-loader, postcss-loader, less-loader
        less: generateLoaders('less'),
        //使用vue-style-loader, css-loader, postcss-loader, sass-loader
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        //使用vue-style-loader, css-loader, postcss-loader, sass-loader
        scss: generateLoaders('sass'),
        //使用vue-style-loader, css-loader, postcss-loader, stylus-loader
        stylus: generateLoaders('stylus'),
        //使用vue-style-loader, css-loader, postcss-loader, stylus-loader
        styl: generateLoaders('stylus')

    }
}

/**
 * 返回多个css，postcss, less等等 rule数组
 * [
 *   {
 *       test: /\.css$/,
 *       use: ['vue-style-loader',
 *              {
                    loader: 'css-loader',
                    options: {
                        sourceMap: options.sourceMap
                    }
 *              },
 *              {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: options.sourceMap
                    }
                }
 *
 *
 *            ]
 *   }
 *
 *
 * ]
 *
 * @param options
 * @returns {Array}
 */
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}





