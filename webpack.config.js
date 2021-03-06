var webpack = require('webpack');
var path = require('path')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function (env, webpackConfig) {

    if (env) {
        if (env.demo === 'demo0') { env.demo = 'demo'; }
    } else {
        env = { demo: 'demo' }
    }
   
    console.log(`./src/${env.demo}/index`)
    return {
        //页面入口文件配置
        entry: {
            index: `./src/${env.demo}/index`
        },
        //入口文件输出配置
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
        //插件项
        plugins: [
            new BrowserSyncPlugin({
                // proxy: 'localhost:80',//要代理的端口
                host: 'localhost',
                port: 5100,
                server: { baseDir: ['build'] }
            }),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/assets',
                to: __dirname + '/build/assets'
            }])
        ],
        module: {
            //加载器配置
            rules: [
                // {
                //     test: /\.tsx?$/,
                //     loader: 'ts-loader',
                //     options: {
                //         configFile: 'tsconfig.json'
                //     }
                // },
                {
                    test: /\.tsx?$/,
                    use: [
                        'cache-loader',
                        {
                            loader: 'thread-loader',
                            options: {
                                workers: require('os').cpus().length - 1,
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.json',
                                happyPackMode: true,
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(frag|vert)$/,
                    use: 'raw-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
            }
        },
        externals: {

        },
        devtool: 'source-map',
        mode: 'development',
        performance: { hints: false }
    };
}