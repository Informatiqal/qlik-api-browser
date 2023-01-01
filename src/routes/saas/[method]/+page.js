import * as api from '$lib/apis';

export const load = async ({ params, fetch }) => {
	const realMethodName = params.method.replace(/_/g, '/').replace(/%7B/, '{').replace(/%7D/, '}');
	//.replace(/\+/g, '{').replace(/=/g, '}');

	// console.log(realMethodName);
	const data = await api.methodsData(realMethodName, 'saas');

	return {
		apiData: data
	};
};
