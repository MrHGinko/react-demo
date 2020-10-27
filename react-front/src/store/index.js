// redux仓库
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//引入仓库 (模块化)
import Home from './Home/Home';
import User from './User/User';
import Collect from './Collect/Collect';
import Good from './Good/Good';

const reducer = combineReducers({
	// 放入各仓库合并
	Home,
	User,
	Collect,
	Good,
});



// 使用谷歌浏览器 redux 插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建仓库实例
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

//导出仓库
export default store;
