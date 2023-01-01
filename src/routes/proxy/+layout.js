
import * as api from '$lib/apis';

export const load = async ({ params, fetch }) => {
	const ninjaData = await api.ninjaData('proxy');

	return {
		ninjaData,
		method: params.method
	};
};
