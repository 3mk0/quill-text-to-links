var path = require('path');
var webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        "textToLinks.min": "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'TextToLinks'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": [
                        ["es2015", {
                            "modules": false
                        }]
                    ],
                    "plugins": ["babel-plugin-transform-class-properties"]
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};