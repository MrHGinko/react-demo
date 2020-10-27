const express = require('express');

const server = express();

server.use(express.urlencoded({ urlencoded: false }));
server.use(express.json());

// 静态资源
server.use('/public', express.static(path.join(__dirname, 'static')));
server.use('/tmp', express.static(path.join(__dirname, 'tmp')));

server.use('/api/data', require('./routers/ajaxRouter'));

server.post('/api/user/login', (req, res) => {
	res.json({
		message: 'ok',
		status: 0,
	});
});

server.get('/hello', (req, res) => {
	res.json({
		name: 'TG_Hong',
		message: 'hello',
	});
});

// 连接数据库

server.listen('1124', (error) => {
	if (!error) {
		console.log('服务器启动成功: localhost:1124');
	} else {
		console.log('服务器启动失败：');
		console.log(error);
	}
});
