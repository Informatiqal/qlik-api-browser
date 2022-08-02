<script>
	import Parameter from './Parameter.svelte';

	export let queryParameters;
</script>

<query-params>
	<div>Query</div>
	<div>
		{#if queryParameters.length == 0}
			-
		{:else}
			{#each queryParameters as definition}
				<Parameter {definition} />
			{/each}
		{/if}
	</div>
</query-params>

<style>
	query-params {
		flex-grow: 1;
		flex-basis: 0;
		min-width: 0;
	}

	query-params > div:nth-child(1) {
		/* font-weight: bold; */
		font-size: 1.2em;
		border-bottom: 2px outset #4a4a4a;
	}

	/* query-params > div:nth-child(2) {
		border-right: 1px solid lightgray;
	} */
</style>
