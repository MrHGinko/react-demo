// App实例
import React, { Component, lazy, Suspense } from 'react';

// 引入路由
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// 公共组件引入 Component
import Tab from './components/Tab/Tab';
import Loading from './components/Loading/Loading';

// 页面组件引入 (懒加载形式)
const notFind = lazy(() => import('./page/common/notFind/notFind'));

const Home = lazy(() => import('./page/Home/Home'));
const Mine = lazy(() => import('./page/Mine/Mine'));
const Good = lazy(() => import('./page/Good/Good'));

const Detail = lazy(() => import('./page/Detail/Detail'));

// export 实例
export default class App extends Component {
	render() {
		return (
			<Router>
				{/* Suspense 懒加载组件, fallback 占位组件 */}
				<Suspense fallback={<Loading />}>
					<Switch>
						{/* Switch阻止加载穿透, 加载对应路由页面后不会继续加载下一个路由页面 */}
						<Route
							path='/'
							exact
							render={() => {
								return <Redirect to='/home' />;
							}}
						/>
						{/* 	重定向 
						
							路由页面
						*/}
						<Route path='/home' component={Home} />
						<Route path='/mine' component={Mine} />
						<Route path='/good' component={Good} />

						{/* 子页面 */}
						<>
							<Route path='/detail/:id/:title' component={Detail} />
						</>

						{/* 公共页面, 如404 */}
						{/* <Route path='*' component={notFind} /> 等价于下面的写法 */}
						<Route component={notFind} />
					</Switch>

					<Tab />
				</Suspense>
			</Router>
		);
	}
}
