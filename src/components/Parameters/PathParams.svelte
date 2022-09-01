<script>
	import Parameter from './Parameter.svelte';

	export let pathParameters;
</script>

<path-params>
	<div>Path</div>
	<div>
		{#if pathParameters.length == 0}
			-
		{:else}
			{#each pathParameters as definition}
				<Parameter {definition} />
			{/each}
		{/if}
	</div>
</path-params>

<style>
	path-params {
		flex-grow: 1;
		flex-basis: 0;
		min-width: 0;
	}

	path-params > div:nth-child(1) {
		/* font-weight: bold; */
		font-size: 1.2em;
		border-bottom: 2px outset #4a4a4a;
	}
</style>
