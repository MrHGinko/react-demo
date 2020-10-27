import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Login } from '../../store/User/User';

import './style.scss';

class Mine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		this.user = null;
		this.word = null;
	}

	render() {
		let show = this.show(this.props.username);
		console.log('登录状态: ', this.props.isLogin);
		console.log('收藏: ', this.props.collection);

		return (
			<div className='page' id='Mine'>
				{show}
			</div>
		);
	}

	show(flag) {
		if (flag) {
			return (
				<div className='showBox'>
					<h2>welcome, {this.props.username}</h2>

					<div className='banner'>轮播图数据</div>

					<h3>我的收藏</h3>
					{this.props.collection.map((item) => (
						<div className='item' key={item.id} onClick={this.toDetail.bind(this, item.id, item.name)}>
							<span className='i-pic'>
								<img src={item.pic} alt='介绍图片' />
							</span>
							<div className='info'>
								<p className='i-title'> {item.name} </p>
								<p className='i-intro'>
									<span> {item.publish} </span>
									<span> {item.city} </span>
								</p>

								<p className='i-info'>{item.info}</p>
							</div>
						</div>
					))}
				</div>
			);
		} else {
			return (
				<div className='login'>
					{/* 双向绑定会导致一直触发render, 修改成ref使用 */}
					<input type='text' placeholder='username' ref={(el) => (this.user = el)} /> <br />
					<input type='text' placeholder='password' ref={(el) => (this.word = el)} />
					<br />
					<button onClick={this.toLogin.bind(this)}>登录</button>
				</div>
			);
		}
	}

	toDetail(id, title) {
		this.props.history.push({ pathname: '/detail/' + id + '/' + title });
	}

	toLogin() {
		if (this.user.value && this.word.value) {
			this.props.toLogin(this.user.value, this.word.value);
		} else {
			console.log('输入未完成');
		}
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.User.username,
		isLogin: state.User.isLogin,
		collection: state.Collect.collection,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toLogin(username, password) {
			let action = Login(username, password);
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
