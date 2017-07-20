webpack = require('webpack');
path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig = {
    context: __dirname,
    entry: {
<<<<<<< Updated upstream
        bundle: './app.js'
=======
        bundle: './app/entry.js'
>>>>>>> Stashed changes
    },
    target: "node",
    output: {
        filename: '[name].js',
        path: path.join(__dirname, "/build"),
        library: '[name]'
    },
    resolve: {
        extensions: ['.html', '.js', '.jsx']
    },
    devtool: '#cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
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
                    /*use: 'css-loader!sass-loader?sourceMap'*/
                    /*use: 'css-loader!resolve-url!sass-loader?sourceMap'*/
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
            title: 'Chess etude',
            filename: path.join(__dirname, "/static/index.html")
         })
    ]
};
module.exports = webpackConfig;
