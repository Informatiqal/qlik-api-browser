import * as api from '$lib/apis';

export const load = async ({ params, fetch }) => {
	const realMethodName = params.method.replace(/_/g, '/').replace('%7B', '{').replace('%7D', '}');
	const data = await api.methodsData(realMethodName, 'proxy');

	return {
		apiData: data
		// restMethod: realMethodName
	};
};
