import React, { Component } from 'react';

// 引入icon-font
import '../../style/iconfont/iconfont.css'

// 引入样式
import './style.scss'

const headerData = [
	{ icon: 'iconfont icon-arrow-lift' },
	{ icon: 'iconfont icon-arrow-right' },
]

export default class Header extends Component {
	render() {
		return (
			<header className='header'>
				<span className='h-left' onClick={this.back.bind(this)}> <i className={headerData[0].icon}></i> </span>
					<h2>{this.props.title}</h2>
				<span className='h-right'> <i className={headerData[1].icon}></i> </span>
			</header>
		);
		
	}

	back() {
		// this.props.history.goback();
		window.history.back();
	}
}
