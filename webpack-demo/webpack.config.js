const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyTreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const webpack = require('webpack');
module.exports = {
	entry: {
		app: './src/index2.js',
		// print: './src/print.js',
		// math: './src/math.js'
	},
	output: {
		filename: '[name].[contenthash:8].js',
		path: path.resolve(__dirname, 'dist')
	},
	// watch: true,
	watchOptions: {
		poll: 1000,
		aggregateTimeout: 500,
		ignored: /node_modules/,
	},
	devtool: 'source-map',
	mode: 'development',
	devServer: {
		port: 8094,
		proxy: {
			'/api': {
				target: 'http://localhost:8081',
				secure: false,
				changeOrigin: true,
			}
		},
		before: function (app, server, compiler) {
			app.get(/^\/api\//, function (req, res, next) {
				if (req.url.match(/^(\/api\/)/) === null) {
					return next();
				}
				try {
					let url = `.${req.url.replace(/\/api/, '/mock')}`;
					delete require.cache[require.resolve(url)];
					let { data, post } = require(url);
					if (post) {
						res.json(data())
					} else {
						next()
					}
				} catch (error) {
					next();
				}

			});
		}
	},
	module: {
		noParse: /jquery|lodash/,
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				// use: 'happypack/loader?id=happyBabel',
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									// targets: {
									// 	ie: '11',
									// 	chrome: '58'
									// },
									useBuiltIns: 'usage',
									corejs: { 
										version: 3, 
										proposals: true 
									  }
								}
							]
						],
						// plugins: [
						// 	[
						// 		"@babel/plugin-transform-runtime",
						// 		{
						// 			"corejs": 3
						// 		}
						// 	]
						// ]
					}
				}]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/dist/',
						}
					},
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: 'www.baidu.com',
						}
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')({
									overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
								})
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								strictMath: true,
							},
						},
					},

				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
						},
					},
				],
			},
			{
				test: /\.(htm|html)$/i, //解决html中图片引用问题
				loader: 'html-withimg-loader'
			},
			{
				test: /\.(xml)$/,
				use: [
					'xml-loader'
				]
			},

		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'hello ccr',
			template: './index.html'
		}),
		new webpack.NamedModulesPlugin(), //热更新时返回文件名而不是id
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css',
			chunkFilename: '[id].css',
		}),
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/locale$/,
			contextRegExp: /moment$/
		}),
		// new HappyPack({
		// 	id: 'happyBabel',
		// 	threadPool: happyTreadPool, //共享进程池
		// 	loaders: [{
		// 		loader: 'babel-loader',
		// 		options: {
		// 			presets: [
		// 				['@babel/preset-env', {
		// 					'target': {
		// 						'modules': false,//关闭，交由webpack帮我们去做
		// 						'browsers': ['last 2 versions', 'safari >= 7']
		// 					}
		// 				}]
		// 			],
		// 			plugins: [
		// 				[
		// 				  'transform-runtime', 
		// 				  {
		// 					'helpers': false,
		// 					'polyfill': false,
		// 					'regenerator': true,
		// 					'moduleName': 'babel-runtime'
		// 				  }
		// 				]
		// 			  ]
		// 		}
		// 	}]
		// })
		// new webpack.DllReferencePlugin({
		// 	context: __dirname,
		// 	manifest: require('./vendor-mainfest.json')
		// })
	]
}

