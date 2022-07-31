<script>
	import HttpMethod from './HttpMethod.svelte';
	// import UrlPath from './UrlPath.svelte';
	export let data;
	// export let restMethod;

	// console.log(data);
</script>

<methods>
	<!-- <header> -->
	<!-- <url-path><UrlPath /></url-path> -->
	<!-- </header> -->
	{#each Object.entries(data) as httpMethod, index}
		{#if httpMethod[0] != 'Area'}
			<HttpMethod methodType={httpMethod[0].toLowerCase()} methodData={httpMethod[1]} {index} />
		{/if}
	{/each}
</methods>

<style>
	methods {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 10px;
		overflow: auto;
		height: 100%;
	}

	/* header {
		display: flex;
		position: sticky;
	} */

	/* url-path {
		font-weight: bold;
		font-size: 2.25em;
		flex-grow: 1;
	} */
</style>
