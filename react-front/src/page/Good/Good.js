import React, { useEffect, useCallback, useRef } from 'react';

import Swiper from 'swiper';

import { useDispatch, useSelector } from 'react-redux';

import { requsetGoodList, goodListSelector } from '../../store/Good/Good';

import './style.scss';

let IScroll = window.IScroll;

const GoodBanner = function(props) {
	const swiperRef = useRef();

	useEffect(() => {
		new Swiper(swiperRef.current, {
			direction: 'horizontal',
			autoplay: true,
		});
	}, []);

	return (
		<div className='banner swiper-container' ref={swiperRef}>
			<div className='swiper-wrapper'>
				{props.imglist.map((item, index) => {
					return (
						<div className='swiper-slide' key={index}>
							<img src={item} alt='good轮播图' />
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Good = function(props) {
	// 取出仓库方法 传入dispatch
	const dispatch = useDispatch();

	const list = useSelector(goodListSelector);

	const box = useRef();

	const reqData = useCallback(() => {
		dispatch(requsetGoodList());
	}, [list]);

	useEffect(() => {
		// dom更新后执行
		// 不传入第二个参数时
		// 等价于 componentDidMount componentDidUpdate 两个生命周期函数

		// 数据请求, 暂不明为何会出现死循环
		if (list.length > 0) {
			console.log(list);
			return;
		} else {
			reqData();
		}

		const scrollBox = new IScroll(box.current, {
			bounce: true,
			click: true,
			mouseWheel: true,
			tap: true,
		});

		scrollBox.on('beforeScrollStart', () => {
			scrollBox.refresh();
		});
	});

	return (
		<div className='page' id='Good' ref={box}>
			<div className='wrap'>
				{list.map((item) => {
					return (
						<div className='item' key={item.id}>
							<p className='i-title'>{item.title}</p>
							<GoodBanner imglist={item.listPic} />
							<p className='i-intro'>{item.text}</p>
							<p className='i-mes'>
								{item.timestamp} / {item.minNum} - {item.maxNum}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Good;
