import Http from '../../utils/Http';
import api from '../../utils/api';

const initState = {
	list: [],
	id: 1,
	page: 1,
};

const setList = (val) => {
	return {
		type: 'setList',
		value: val,
	};
};

export const requestHomeList = (id, page) => async (dispatch) => {
	console.log('home redux 请求 HomeList');

	// 实际请求由此处实现, 并暴露
	let result = await Http.get(api.Test, { id, page });
	let action = setList(result.data.data);
	dispatch(action);
};

export default (state = initState, action) => {
	switch (action.type) {
		case 'setList':
			return {
				...state,
				list: [...state.list, ...action.value],
				id: state.id + 1,
				page : state.page + 1,
			};
		default:
			return state;
	}
};
