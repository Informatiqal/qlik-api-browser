<script>
	import Parameter from './Parameter.svelte';

	export let headerParameters;
</script>

<header-params>
	<div>Header</div>
	<div>
		{#if headerParameters.length == 0}
			-
		{:else}
			{#each headerParameters as definition}
				<Parameter {definition} />
			{/each}
		{/if}
	</div>
</header-params>

<style>
	header-params {
		min-width: 200px;
		max-width: 55%;
		flex-grow: 1;
	}

	header-params > div:nth-child(1) {
		/* font-weight: bold; */
		font-size: 1.2em;
		border-bottom: 2px outset #4a4a4a;
	}

	/* header-params > div:nth-child(2) {
		border-right: 1px solid lightgray;
	} */
</style>
