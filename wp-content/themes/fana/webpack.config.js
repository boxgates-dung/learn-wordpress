const webpack = require( 'webpack' )
const WebpackBar = require( 'webpackbar' )
const path = require( 'path' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' )
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' )
const ESLintPlugin = require( 'eslint-webpack-plugin' )
const ImageMinimizerPlugin = require( 'image-minimizer-webpack-plugin' )
const TerserPlugin = require( 'terser-webpack-plugin' )

module.exports = {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve( __dirname, 'assets/src/js' )],
				// exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],
					presets: [
						[
							'@babel/preset-env',
							{ modules: false }
						]
					]
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							// sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							//   sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				include: [path.resolve( __dirname, 'assets/src/images' )],
				// exclude: /(node_modules)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]?[hash]',
							outputPath: 'images',
							publicPath: '../images',
							useRelativePaths: true
						}
					},
					{
						loader: ImageMinimizerPlugin.loader,
						options: {
							severityError: 'warning', // Ignore errors on corrupted images
							minimizerOptions: {
								plugins: [
									[ 'gifsicle', { interlaced: true } ],
									[ 'jpegtran', { progressive: true } ],
									[ 'optipng', { optimizationLevel: 5 } ],
									[ 'svgo', {
										plugins: [
											{ removeViewBox: false }
										]
									} ]
								]
							}
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				include: [path.resolve( __dirname, 'assets/src/fonts' )],
				exclude: /(node_modules)/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/',
						publicPath: '../fonts'
					}
				}]
			}
		]
	},
	// resolve: {
	// 	alias: {
	// 		'jquery.validation': 'jquery-validation/dist/jquery.validate.js'
	// 	}
	// },
	entry: {
		theme: './assets/src/scss/theme.scss',
		vendors: './assets/src/scss/vendors.scss',
		app: './assets/src/js/index.js'
		// 'elementor-editor': './assets/src/js/elementor-editor.js'
	},
	output: {
		//path.resolve(__dirname, 'assets/src/js')
		path: path.resolve( __dirname, 'assets/public' ),
		filename: 'js/[name].min.js'
	},
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new WebpackBar( {} ),
		new ESLintPlugin(),
		// new FixStyleOnlyEntriesPlugin(),
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin( {
			filename: 'css/[name].css',
			chunkFilename: '[id].css'
		} ),
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		} )
	],
	mode: 'development',
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			},
			minChunks: 1,
			minSize: 20000
		}
	}
	// watch: true
}