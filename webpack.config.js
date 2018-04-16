const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'examples/index.js'),
    // output: {
	// 	path: path.resolve(__dirname, 'examples/build'),
	// 	filename: 'bundle.js'
    // },
    resolve: {
        extensions: ['.js', '.jsx']
	},
    module: {
        rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', "css-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./examples/index.html",
			filename: "./index.html"
		}),
	]
}

/**
 * 加上这个，用webpack-dev-server，会实时刷新
new HtmlWebPackPlugin({
	template: "./examples/build/index.html",
	filename: "./index.html"
}),
 */


