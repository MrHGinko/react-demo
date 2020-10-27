const initState = {
	collection: [],
};

// action方法
export const addCollect = (obj) => async (dispatch) => {
	// 外部传入detail点击收藏后的obj
	let action = collectAction.add(obj);
	dispatch(action);
	// console.log(obj)
};

export const deleteCollect = (id) => async (dispatch) => {
	let action = collectAction.delete(id);
	dispatch(action);
	// console.log(id)
};

export const logout = () => (dispatch) => {
	let action = collectAction.logout();
	dispatch(action);
};
// 提供外部的方法

// action加工
const collectAction = {
	add(val) {
		return {
			// 数据虽然存在于Home Redux中
			// add可以直接拿Detail获取到的
			type: 'add',

			// 传入的val为对象
			value: val,
		};
	},

	delete(val) {
		return {
			type: 'delete',
			// 传入val 为对应ID
			value: val,
		};
	},

	logout() {
		return {
			type: 'logout',
			value: [],
		};
	},
};

export default (state = initState, action) => {
	// 判别使用方法
	switch (action.type) {
		case 'add':
			return {
				...state,
				// value 为传入的 collect对象
				collection: [...state.collection, action.value],
			};
		case 'delete':
			return {
				...state,
				collection: state.collection.filter((item) => item.id !== action.value),
			};
		case 'logout':
			return {
				...state,
				collection: action.value,
			};
		default:
			return state;
	}
};
