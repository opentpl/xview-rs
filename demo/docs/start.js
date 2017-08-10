const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

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

new WebpackDevServer(webpack({
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './docs/entry'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.xv']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
                // include: [
                //     path.join(__dirname, '../docs'),
                //     path.join(__dirname, '../src'),
                //     path.join(__dirname, '../libs')
                // ]
            },
            {
                test: /\.xv$/,
                //include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['babel-loader', 'xview-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif)(\?.+)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.md$/,
                loader: 'raw-loader'
            }
        ]
    }
}), {
        contentBase:'./docs',
        publicPath: '/site/',
        hot: true,
        historyApiFallback: true,
        stats: { colors: true }
    }).listen(3000, 'localhost', error => {
        if (error) {
            throw error;
        }
    });