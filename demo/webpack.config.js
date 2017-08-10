const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                'env',
                {
                    'targets': {
                        'browsers': ['last 2 versions', 'ie >= 10']
                    }
                }
            ]
        ],
        plugins: ['transform-runtime']
    }
}

module.exports = {
    devtool: '#cheap-module-eval-source-map',
    entry: {
        app: ['./src/index.js'],
        vendor: ['xview-react']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        library: '[name]_[chunkhash]',
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.xv']
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx|xv)$/,
                    /\.(css|less)$/,
                    /\.json$/,
                    /\.svg$/,
                ],
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                query: {
                    name: 'static/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [babelLoader],
            },
            {
                test: /\.xv$/,
                include: path.join(__dirname, 'src'),
                use: [babelLoader, 'xview-loader']
            },
            {
                test: /\.css$/,
                //include: path.join(__dirname, 'src'),
                use: ['style-loader', {
                    loader: 'css-loader',
                    query: { importLoaders: '1' },
                }]
            }
        ]
    },
    plugins: [
        //http://www.imooc.com/article/10969
        // new webpack.DllPlugin({
        //     path: path.join(__dirname, 'build', '[name]-manifest.json'),
        //     name: '[name]_[hash]'
        // })
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        }),
        // new HtmlWebpackPlugin({ filename: './index-release.html', template: path.resolve('index.template'), inject: 'body' }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false,
            },
            mangle: {
                screw_ie8: true,
            },
            output: {
                comments: false,
                screw_ie8: true,
            },
        }),
    ],
}