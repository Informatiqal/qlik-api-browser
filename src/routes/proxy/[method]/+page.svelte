<script>
	import Method from '../../../components/Method.svelte';
	export let data;
	// export let restMethod;
	// $: loaded = false;
	// $: if (data && restMethod) loaded = true;
</script>

<Method data={data.apiData} />
