const path = require('path')
const webpack = require('webpack')

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
    //devtool: '#cheap-module-eval-source-map',
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
        library: 'XviewReact',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                //exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [babelLoader],
            }
        ]
    },
    plugins: [
        // new webpack.DllPlugin({
        //     path: path.join(__dirname, 'build', '[name]-manifest.json'),
        //     name: '[name]_[hash]'
        // })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function (module) {
        //         // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        //         return module.context && module.context.indexOf('node_modules') !== -1;
        //     }
        // }),
    ],
}