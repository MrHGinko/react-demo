import React from 'react';

// 引入路由
import { NavLink } from 'react-router-dom';

// 引入icon-font
import '../../style/iconfont/iconfont.css';

// 引入样式
import './style.scss';

const tabData = [
	{ id: 0, title: 'goods', icon: 'iconfont icon-good', path: '/good' },
	{ id: 1, title: 'home', icon: 'iconfont icon-home', path: '/home' },
	{ id: 2, title: 'mine', icon: 'iconfont icon-account', path: '/mine' },
];

export default function Tab() {

	return (
		<nav className='tabs'>
			{tabData.map((item) => {
				return (
					<NavLink className='tab' key={item.id} to={item.path}>
						<span className={item.icon}></span>
						<span className='text'> {item.title} </span>
					</NavLink>
				);
			})}
		</nav>
	);

	
}
