// 挂载三部曲
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 引入公共样式
import './style/reset.scss';
import './style/style.scss';

// 引入仓库
import store from './store';


// 类似mixins, 对各组件提供仓库实例
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	// 挂载的DOM节点
	document.querySelector('#root'),
);
