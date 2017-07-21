var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig = {
    context: __dirname,
    entry: {
        bundle: './app/entry.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, "/static"),
        library: '[name]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: '#cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!resolve-url-loader!sass-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'styles.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Tic-tac-toe',
            filename: path.join(__dirname, "/static/index.html")
         })
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    }
};
module.exports = webpackConfig;
