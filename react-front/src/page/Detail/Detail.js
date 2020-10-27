import React, { PureComponent } from 'react';
import Swiper from 'swiper';

import Header from '../../components/Header/Header';

import './style.scss';

import { requestDetail } from '../../service/detailService';

import { connect } from 'react-redux';
import { addCollect, deleteCollect } from '../../store/Collect/Collect';

class Detail extends PureComponent {
	constructor(props) {
		super(props);

		this.id = this.props.match.params.id;
		this.name = this.props.match.params.title;
		console.log(this.props);
		this.state = {
			hasFlag: false,
			detail: {
				title: [],
				pic: [],
			},
		};
		this.banner = null;
	}

	render() {
		let info = this.state.detail;
		console.log('是否登录: ', this.props.isLogin);
		console.log('仓库Collection数据', this.props.collection);
		return (
			<div id='detail'>
				<Header title={info.name} />
				<div className='show'>
					<div className='head'>
						<span>
							<div
								className='banner swiper-container'
								ref={(el) => {
									this.banner = el;
								}}>
								<div className='swiper-wrapper'>
									{info.pic.map((item, index) => (
										<div className='swiper-slide' key={index}>
											<img src={item} alt='轮播图图片' />
										</div>
									))}
								</div>
							</div>
						</span>
						<div className='h-right'>
							{/* <p>{info.title}</p> */}
							<p>
								Key :
								{info.title.map((item, index) => (
									<span key={index}>{item} /</span>
								))}
							</p>
							<p> 评分 : {info.cvalue} </p>
							<p> 城市 : {info.city} </p>
							<p> 信息 : {info.info} </p>
						</div>
					</div>
					<div className='txt'>
						<p className='t-com'>评价: {info.comment}</p>
						<p className='t-cho'>节选: {info.paragraph}</p>
					</div>

					<button className='collect' onClick={this.collectAction.bind(this, info)}>
						{this.state.hasFlag ? '取消收藏' : '收藏'}
					</button>
				</div>
			</div>
		);
	}

	collectAction(info) {
		if (!this.props.isLogin) {
			console.log('请先登录');
			this.props.history.push({ pathname: '/mine' });
			return;
		}

		if (this.state.hasFlag) {
			this.props.deleteItem(info.id);

			// 修改hasFlag
			this.setState((state) => {
				return {
					...state,
					hasFlag: !state.hasFlag,
				};
			});
		} else {
			this.props.addItem(info);
			this.setState((state) => {
				return {
					...state,
					hasFlag: !state.hasFlag,
				};
			});
		}
	}

	async componentDidMount() {
		let result = await requestDetail(this.id, this.name);

		this.setState(
			{
				...this.state,
				detail: result.data,
				// 进入的初始值需要通过redux中是否存在而确定
				hasFlag: this.props.collection.filter((item) => item.id === this.id).length ? true : false,
			},
			() => {
				console.log('请求数据成功', this.state);
				new Swiper(this.banner, {
					direction: 'horizontal',
					autoplay: true,
				});

				// this.state.detail.title.forEach(item=>console.log(item))
				// 可以在这里使用数组方法, 在render中无法使用
			},
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addItem(item) {
			let action = addCollect(item);
			dispatch(action);
		},
		deleteItem(id) {
			let action = deleteCollect(id);
			dispatch(action);
		},
	};
};
const mapStateToProps = (state) => {
	return {
		isLogin: state.User.isLogin,
		collection: state.Collect.collection,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
