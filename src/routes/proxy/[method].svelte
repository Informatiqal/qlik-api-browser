<script context="module">
	import * as api from '$lib/apis';

	export const load = async ({ params, fetch }) => {
		const realMethodName = params.method.replace(/_/g, '/').replace('%7B', '{').replace('%7D', '}');
		const data = await api.methodsData(realMethodName, 'proxy');

		return {
			// status: 301,
			props: {
				data: data
				// restMethod: realMethodName
			}
		};
	};
</script>

<script>
	import Method from '../../components/Method.svelte';
	export let data;
	// export let restMethod;
	// $: loaded = false;
	// $: if (data && restMethod) loaded = true;
</script>

<!-- {#if loaded} -->
<Method {data} />
<!-- {/if} -->
