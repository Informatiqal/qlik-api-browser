<script>
	export let stabilityHeader;
	const stabilityHelpText = {
		locked: 'This API is extremely reliable and will not be broken unless absolutely necessary.',
		stable: 'This API is reliable and breaking changes are unlikely.',
		experimental:
			'This API is under development. Do not rely on it. It may change or be removed in future versions.'
	};
</script>

<stability title={stabilityHelpText[stabilityHeader.toLowerCase()]}>
	{#if stabilityHeader && stabilityHeader.toLowerCase() == 'locked'}
		<span>LOCKED</span>
	{/if}

	{#if stabilityHeader && stabilityHeader.toLowerCase() == 'stable'}
		<span>STABLE</span>
	{/if}

	{#if stabilityHeader && stabilityHeader.toLowerCase() == 'experimental'}
		<span class="experimental">EXPERIMENTAL</span>
	{/if}
</stability>

<style>
	stability {
		/* font-weight: bold; */
		display: flex;
		align-items: center;
		justify-content: end;
		text-decoration: underline dotted;
		text-underline-position: under;
		cursor: help;
		color: white;
		font-size: 12px;
	}

	.experimental {
		color: red;
	}
</style>
