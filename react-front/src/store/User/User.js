import Http from '../../utils/Http';
import api from '../../utils/api';

const initState = {
	isLogin: false,
	username: null,
};

export const setUsername = (username) => {
	console.log('仓库判断 登录成功... 设置isLogin');
	return {
		type: 'setUsername',
		value: username,
	};
};

export const Login = (username, password) => async (dispatch) => {
	console.log('user redux Login .......', username, password);

	let result = await Http.post(api.USER_LOGIN, {
		username,
		password,
	});
	
	console.log(result);

	if (result.data.status === 0) {
		let action = setUsername(username);
		dispatch(action);
		
	}
};

export default (state = initState, action) => {
	switch (action.type) {
		case 'setUsername':
			return {
				...state,
				username: action.value,
				isLogin: true,
			};
		default:
			return state;
	}
};
