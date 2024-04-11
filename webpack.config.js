const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react']
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
            title: 'Development',
            template: path.resolve(__dirname, './index.html'),
    })],
    stats: {
        children: true
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'build'),
            publicPath: '/build'
        },
        proxy: [{
            context: ['/'],
            target: 'http://localhost:3000', // Proxy requests to Express server
            },
        ],
        port: 8080
    },
    devtool: 'source-map',
};