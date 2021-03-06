
const { resolve } = require('path');
const r = url => resolve(__dirname, url);
const config = require('../config')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
    filename:'[name].js'
})
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    devtool: false,
    output: {
        path: config.assetsPath,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            util: r('../util/util')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "latest"
                    ]
                }
            },
            {
                test: /\.sass$/,
                use: extractSass.extract({
                   use:
                       [
                            {
                                loader: 'css-loader' //css-loader 解释(interpret) @import 和 url()
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: (loader) => [
                                        require('autoprefixer')({
                                            browsers: [
                                                'last 2 versions'
                                            ]
                                        })
                                    ]
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    indentedSyntax: true
                                }
                            }
                       ],
                        fallback: 'style-loader'
                })
            },
            {
                test: /\.mina$/,
                loader: 'wechat-mina-loader',
                options: {
                    dist: './mina'
                }
            }
        ]
    },
    plugins: [
        extractSass,
        new CopyWebpackPlugin([
            {
                from: {
                    glob: 'pages/**/*.json',
                    to: ''
                },
            },
            {
                from: 'static',
                to: 'static'
            }
        ]),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            souceMap: false
        }),
        new ProgressBarPlugin()
    ],
}