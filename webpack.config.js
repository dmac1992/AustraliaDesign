const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
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
            }
        ]
    },
    plugins: [
        extractPlugin
    ]
}