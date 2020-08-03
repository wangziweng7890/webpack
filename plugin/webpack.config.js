let path = require('path');
let FileListPlugin = require('./plugins/fileListPlugin');
let HtmlWebpackPlugun = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugun({
            template: './src/index.html'
        }),
        new FileListPlugin({
            filename: 'list.md'
        }),
        
    ]
}