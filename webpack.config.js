// 引入path包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//  webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
    mode: 'development',
    // 指定入口文件
    entry: "./index.ts",

    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'bundle.js'
    },

    // 指定webpack打包时要使用的模块
    module: {
        // 指定加载的规则
        rules: [
            {
                // 制定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader 从后往前执行
                use: [
                    // 配置babel loader
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的浏览器版本
                                        targets: {
                                            "chrome": '88',
                                            'ie': "11"
                                        },
                                        // corejs版本
                                        "corejs": '3',
                                        // 使用corejs的方式 usage按需加载
                                        useBuiltIns: 'usage',

                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 version'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        // build时先将目录清空在创建新文件
        new CleanWebpackPlugin(),
        // 使用htmlwebpackplugins
        new HTMLWebpackPlugin({
            // title: '自定义title'
            // 使用已存在的index.html 作为页面模板
            template: './index.html'
        }),
    ],
    //  设置引用模块
    resolve: {
        // 那些后缀名的文件可以作为模块引用
        extensions: ['.ts', '.js', '.less']
    }
}