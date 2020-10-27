import Http from '../../utils/Http';
import api from '../../utils/api';

const initState = {
	goodList: [],
};

const setList = (val) => {
	return {
		// type不能重名, 即使是分开引入也不行 重名的type会导致互相触发
		type: 'setGoodList',
		value: val,
	};
};

export const requsetGoodList = () => async (dispatch) => {
	console.log('good页面请求开始....');

	let result = await Http.get(api.GOOD_LIST);
	let action = setList(result.data.data);
	dispatch(action);
};

export const goodListSelector = (state) => {
	return state.Good.goodList;
}

export default (state = initState, action) => {
	switch (action.type) {
		case 'setGoodList':
			return {
				...state,
				goodList: action.value,
			};
		default:
			return state;
	}
};
