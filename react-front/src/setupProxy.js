const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		'/api',
		proxy({
			target: 'http://123.57.146.121:1123',
			changeOrigin: true,
		}),
	);
};
