let fs = require('fs');
let path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    // watch: true,
    devtool: 'source-map',
    resolveLoader: {
        modules: [path.resolve(__dirname, 'loaders'), path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|svg|png|webp)/,
                use: [
                    // {
                    //     loader: 'file-loader'
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1 * 1024
                        }
                    }
                ]
            },  
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'bannel-loader',
                        options: {
                            filename: path.resolve(__dirname, './bannel.js'),
                            text: '12345'
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        },
                    }
                ]
            }
        ]
    }
}