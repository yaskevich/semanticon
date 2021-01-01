//vue.config.js
module.exports = {
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
