const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
    return path.resolve(__dirname, '..' ,dir)
}

//webpack配置项
module.exports = {
    entry: {
        app: './src/main.js',
        // urus: './urus/urus' // webpack4不需要三方库作为入口
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    process.env.APP_MODE === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader, // MiniCssExtractPlugin暂不支持HMR
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff2?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 1024 * 4
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('public/index.html')
        }),
        new webpack.DefinePlugin({ // 定义模块内部全局变量
            'process.env.APP_MODE': JSON.stringify(process.env.APP_MODE),
            'process.env.BUILD_TIME': JSON.stringify(new Date()),
            'noop': () => void 0
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30 * 1024,
            maxSize: 500 * 1024,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true, 
            cacheGroups: {
                react: {
                    name: 'chunk-react',
                    test: /[\\/]node_modules[\\/](react(-dom|-router)?|redux)[\\/]/,
                    priority: -5,
                    chunks: 'all',
                },
                vendor: {
                    name: `chunk-vendor`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                default: {
                    name: 'chunk',
                    priority: -20,
                    chunks: 'initial',
                    minChunks: 2,
                    reuseExistingChunk: true
                },
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': resolve('src'),
            'urus': resolve('urus')
        }
    }
};
