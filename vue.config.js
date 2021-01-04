//vue.config.js
const webpack = require('webpack');
module.exports = {
	configureWebpack: {
		plugins: [
			// Define Bundler Build Feature Flags
			new webpack.DefinePlugin({
				// Drop Options API from bundle
				"__VUE_OPTIONS_API__": true,
				"__VUE_PROD_DEVTOOLS__": false,
			}),
		]},
	devServer: {
		port: 9000,
		host: "localhost",
		https: false,
		open: false,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				ws:true,
				// pathRewrite: {
					// "^/api": ""
				// },
				logLevel: 'debug'
			},
			// "/media": {
			// 	target: "http://localhost:5000",
			// 	changeOrigin: true,
			// 	logLevel: 'debug'
			// }
		}
	}
}
