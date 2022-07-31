<script>
	export let data;
</script>

<enums>
	<div class="title3">Default</div>
	{#if data.hasOwnProperty('default')}
		<div class="value3"><code>{data.default}</code></div>
	{:else}
		<div class="value3">-</div>
	{/if}

	<div class="title2">Type</div>
	<div class="value2">{data.type}</div>

	<div class="title1">Values</div>
	<div class="value1">
		{#each data.enum as enumValue, index}
			<code>
				{enumValue}
				{#if data['x-enumNames']}
					{data['x-enumNames'][index]}
				{/if}
			</code>
		{/each}
	</div>
</enums>

<style>
	enums {
		padding: 1em;
		display: grid;
		grid-template-columns: 4fr 10fr;
		grid-template-areas:
			'title2 value2'
			'title3 value3'
			'title1 value1';
		gap: 5px;
	}

	.title1 {
		grid-area: title1;
	}

	.title2 {
		grid-area: title2;
	}

	.title3 {
		grid-area: title3;
	}

	.value1 {
		grid-area: value1;
		display: flex;
		flex-direction: column;
	}

	.value2 {
		grid-area: value2;
	}

	.value3 {
		grid-area: value3;
	}

	.value3 > code {
		width: 100%;
		display: inline-block;
	}

	/* code { */
	/* background-color: black; */
	/* } */
</style>
