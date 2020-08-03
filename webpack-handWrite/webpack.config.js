let path = require('path');
let Plugin1 = require('./plugins/index1')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    modules: {
        rules: [
            {
                test: /.less/,
                use: [
                    path.resolve(__dirname, './loader/style-loader.js'),
                    path.resolve(__dirname, './loader/less-loader.js'),
                ]
            }
        ]
    },
    plugins: [
        new Plugin1()
    ]
}