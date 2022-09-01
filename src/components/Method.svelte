<script>
	import HttpMethod from './HttpMethod.svelte';
	// import UrlPath from './UrlPath.svelte';
	export let data;
	// console.log(data);
	// export let restMethod;
</script>

<methods>
	<!-- <header> -->
	<!-- <url-path><UrlPath /></url-path> -->
	<!-- </header> -->

	{#if data.name}
		<HttpMethod methodType={'WebSocket'} methodData={data} index={0} />
	{:else}
		{#each Object.entries(data) as httpMethod, index}
			{#if httpMethod[0] != 'Area'}
				<HttpMethod methodType={httpMethod[0].toLowerCase()} methodData={httpMethod[1]} {index} />
			{/if}
		{/each}
	{/if}
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
