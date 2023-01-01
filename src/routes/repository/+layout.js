
import * as api from '$lib/apis';

export const load = async ({ params, fetch }) => {
	const ninjaData = await api.ninjaData('repo');

	return {
		ninjaData,
		method: params.method
	};
};
