// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js',
    },

    module: {
        rules: [
            { test: /\.jsx?/, exclude: /node_modules/, use: {loader: 'babel-loader',}},
            { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
            { test: /\.css$/, use: ['style-loader','css-loader']},
        ]
    },
    // plugins: [new HtmlWebpackPlugin({
    //     template: 'index.html',
    // })],
    target: "web",
    devServer: {
        host: 'localhost',
        port: 8080,
        static: {
          directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true,
        liveReload: true,
        // compress: true,
        headers: { 'Access-Control-Allow-Origin': '*' },

        proxy: {
          '/api/**': {
            target: 'http://localhost:3000/',
            secure: false,
          },

        },
    // resolve: { /*order for resolving files that have the same name*/
    //     extensions: [".js", ".jsx", ".json"],
     },
    };
