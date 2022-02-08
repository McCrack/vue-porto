const path = require("path");

module.exports = {
	publicPath: "/",
	outputDir: "dist/",
	indexPath: "./index.html",
	devServer: {
		proxy: 'http://localhost:8000',
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@use '@/Ship/assets/themes/default' as *;`,
				//prependData: `@use '@/styles/abstracts/_variables.scss' as *;`,
			},
		},
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@assets': path.resolve(__dirname, 'src/Ship/assets'),
			}
		},
	}
};
