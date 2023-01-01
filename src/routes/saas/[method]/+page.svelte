<!-- <script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import * as api from '$lib/apis';

	// export const load = async ({ params, fetch }) => {
	// 	const realMethodName = params.method.replace(/_/g, '/').replace(/%7B/, '{').replace(/%7D/, '}');
	// 	//.replace(/\+/g, '{').replace(/=/g, '}');

	// 	// console.log(realMethodName);
	// 	const data = await api.methodsData(realMethodName, 'saas');

	// 	return {
	// 		props: {
	// 			data: data
	// 			// restMethod: realMethodName
	// 		}
	// 	};
	// };
</script> -->
<script>
	// throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import Method from '../../../components/Method.svelte';
	export let data;

	// console.log(data.test);
	// $: d = data;
	// export let restMethod;
</script>

<Method data={data.apiData} />
