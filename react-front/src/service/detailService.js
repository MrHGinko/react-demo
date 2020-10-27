import Http from '../utils/Http'
import api from '../utils/api'


export const requestDetail = async function(id, name) {
	let result = await Http.post(api.INFO_DETAIL, {id, name});
	return result.data;
}

export const TestMyStudy = async function(test) {
	let result = await test;
	return result;
}