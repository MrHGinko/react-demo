import React, { Component } from 'react';

// 类似高阶组件 连接redux仓库
import { connect } from 'react-redux';

// 获取数据方法 (写在仓库中)
import { requestHomeList } from '../../store/Home/Home';

import './style.scss';

let IScroll = window.IScroll;

class Home extends Component {
	constructor() {
		super();
		this.canReq = true;

		// 进行修改. id, page存入redux
		// 原因, 存于Home组件中会因为路由跳转的关系而重置id page 的值
		// 导致跳回Home组件时 重复执行了 id: 1 page: 1 的请求.
	}
	render() {
		return (
			<div className='page' id='List'>
				<div className='wrap'>
					{this.props.list.map((item) => (
						<div className='item' key={item.id} onClick={this.toDetail.bind(this, item.id, item.title)}>
							<span className='i-pic'>
								<img src={item.pic} alt='介绍图片' />
							</span>
							<div className='info'>
								<p className='i-title'>
									{item.id} {item.title}{' '}
								</p>
								<p className='i-intro'>
									<span> {item.publish} </span>
									<span> {item.city} </span>
								</p>

								<p className='i-info'>{item.info}</p>
							</div>
						</div>
					))}
					<div className='load'>{this.props.page === 5 ? '没有更多啦' : '上拉加载更多'}</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		let that = this;

		this.scrollBox = new IScroll(document.querySelector('#List'), {
			bounce: true,
			click: true,
			mouseWheel: true,
			tap: true,
		});

		this.scrollBox.scrollTo(0, -1, 100);

		// this.scrollBox.refresh();
		this.scrollBox.on('beforeScrollStart', () => {
			this.scrollBox.refresh();
		});

		this.scrollBox.on('scrollEnd', function() {
			if (this.y <= this.maxScrollY) {
				this.canReq = true;
				if (that.canReq) {
					setTimeout(async () => {
						console.log(11111);
						await that.getData();
						this.scrollTo(0, this.maxScrollY + 42, 300);
						this.refresh();

						// 节流
						that.canReq = true;
					}, 300);
				}

				that.canReq = false;
			} else if (this.y <= this.maxScrollY + 30) {
				this.scrollTo(0, this.maxScrollY + 42, 300);
			}
		});
	}

	toDetail(id, title) {
		this.props.history.push({ pathname: '/detail/' + id + '/' + title });
	}

	getData() {
		if (this.props.list.length > 30) {
			return;
		} else {
			this.props.getHomeList(this.props.id, this.props.page);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		list: state.Home.list,
		id: state.Home.id,
		page: state.Home.page,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getHomeList(id, page) {
			let action = requestHomeList(id, page);
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
