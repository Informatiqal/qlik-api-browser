<script>
	import Parameter from './Parameter.svelte';
	export let bodyParameters;

	// console.log(bodyParameters);
</script>

<body-params>
	<div>Body</div>
	<div>
		{#if !bodyParameters || bodyParameters.length == 0}
			-
		{:else if Array.isArray(bodyParameters)}
			{#each bodyParameters as bodyParam}
				<Parameter definition={bodyParam} />
			{/each}
		{:else}
			<Parameter definition={bodyParameters} />
		{/if}
	</div>
</body-params>

<style>
	body-params {
		flex-grow: 1;
		flex-basis: 0;
		min-width: 0;
	}

	body-params > div:nth-child(1) {
		/* font-weight: bold; */
		/* border-bottom: 1px solid #4a4a4a; */
		border-bottom: 2px outset #4a4a4a;
		font-size: 1.2em;
	}
</style>
