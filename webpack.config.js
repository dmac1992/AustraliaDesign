const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
              test: /\.scss$/,
              use: extractPlugin.extract({
                  use: ['css-loader', 'sass-loader']
              }) 
            },
            {
                test: /\.ttf$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }] 
                
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}