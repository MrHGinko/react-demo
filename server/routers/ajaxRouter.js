const express = require('express');
const Mock = require('mockjs');

const router = express.Router();

// ajax 请求中间件
// req.query可以直接拿到get数据, post比较复杂需要监听req.on('data') 事件 一段一段的拿到
//  于req.on('end') 中拿完整个数据

router.get('/goodlist', (req, res)=> {
	res.json(
		Mock.mock({
			message:'ok',
			status: 0,
			'data|20': [
				{
					'id|+1': 1,
					'listPic|3': ['@image(500x400, @color())'],
					title: '@ctitle',
					text: '@csentence',
					timestamp: '@date',
					'maxNum|100-1000':0,
					'minNum|0-50':0,
				}
			]
		})
	)
})


router.get('/testData', (req, res) => {
	res.json(
		Mock.mock({
			message: 'ok',
			status: 0,
			'data|10': [
				{
					'id|+1': req.query.id  * 10 - 9,
					title: '@ctitle',
					pic: '@image(100x100)',
					info: '@csentence',
					city: '@city',
					publish: '@date',
				},
			],
		}),
	);
});

router.post('/detail', (req, res) => {
	// 暂时拿取name 后期需要删除

	res.json(
		Mock.mock({
			message: 'ok',
			status: 0,
			data: {
				id: req.body.id,
				name: req.body.name,
				title: ['@cword(2)', '@cword(2)', '@cword(2)', '@cword(2)'],
				city: '@province',
				'pic|3': ['@image(700x400, @color())'],
				info: '@csentence',
				comment: ['@csentence', '@csentence', '@csentence'],
				'cvalue|1-10': 0,
				paragraph: '@cparagraph',
			},
		}),
	);
});

module.exports = router;
